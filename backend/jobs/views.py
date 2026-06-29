from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Job, Application, Contract, AttendanceRecord, PaymentTransaction
from .serializers import JobSerializer, ApplicationSerializer, ContractSerializer
from users.models import EmployerProfile, WorkerProfile
import random
import uuid
from django.utils import timezone

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def create(self, request, *args, **kwargs):
        # We need employer ID. For now we accept it in request data or just pick first
        employer_id = request.data.get('employer_id')
        if not employer_id:
            employer = EmployerProfile.objects.first()
            if not employer:
                return Response({"error": "No employer found. Please create one."}, status=status.HTTP_400_BAD_REQUEST)
            request.data['employer'] = employer.id
        else:
            request.data['employer'] = employer_id

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        job = serializer.save()

        # Trigger Mock AI Agent to find matches
        self._trigger_ai_match(job)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def _trigger_ai_match(self, job):
        # Mocking Agent 2: Job Match
        workers = WorkerProfile.objects.all()[:5] # Just take some workers
        for worker in workers:
            # Create match
            score = random.randint(70, 99)
            Application.objects.create(
                job=job,
                worker=worker,
                match_score=score,
                status='matched'
            )

    @action(detail=True, methods=['get'])
    def matches(self, request, pk=None):
        job = self.get_object()
        applications = Application.objects.filter(job=job).order_by('-match_score')
        serializer = ApplicationSerializer(applications, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def negotiate(self, request):
        application_id = request.data.get('application_id')
        employer_offer = request.data.get('offer')
        
        try:
            application = Application.objects.get(id=application_id)
            application.status = 'negotiating'
            application.save()

            # Mock AI Agent 3: Negotiation
            market_rate = 950 # Hardcoded market rate for demo
            worker_score = application.worker.trust_score

            if float(employer_offer) >= market_rate:
                reply = f"The worker accepts your offer of ₹{employer_offer}."
                accepted = True
            else:
                reply = f"Based on market rates in {application.job.location} and the worker's {worker_score} Trust Score, ₹{market_rate} is a fair offer."
                accepted = False

            return Response({
                "ai_reply": reply,
                "accepted": accepted,
                "suggested_wage": market_rate
            })
        except Application.DoesNotExist:
            return Response({"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def accept_offer(self, request):
        application_id = request.data.get('application_id')
        final_wage = request.data.get('final_wage')

        try:
            application = Application.objects.get(id=application_id)
            application.status = 'accepted'
            application.save()

            job = application.job
            job.status = 'contracted'
            job.save()

            # Simulate escrow funding (duration * wage * 50%)
            # We don't have duration in Job model, so let's mock it
            escrow_amount = float(final_wage) * 14 * 0.5 

            contract = Contract.objects.create(
                job=job,
                worker=application.worker,
                final_wage=final_wage,
                employer_signed=True,
                worker_signed=True,
                escrow_balance=escrow_amount
            )

            # Create the Escrow Deposit Transaction
            PaymentTransaction.objects.create(
                contract=contract,
                amount=escrow_amount,
                transaction_type='deposit',
                status='completed',
                reference_id=str(uuid.uuid4())
            )

            return Response({"message": "Contract created successfully!", "contract_id": contract.id})
        except Application.DoesNotExist:
            return Response({"error": "Application not found"}, status=status.HTTP_404_NOT_FOUND)


class ContractViewSet(viewsets.ModelViewSet):
    queryset = Contract.objects.all()
    serializer_class = ContractSerializer

    @action(detail=True, methods=['post'])
    def clock_in(self, request, pk=None):
        contract = self.get_object()
        gps_location = request.data.get('gps_location', 'Unknown Location')

        # Check if already clocked in today
        today = timezone.now().date()
        attendance, created = AttendanceRecord.objects.get_or_create(
            contract=contract,
            date=today,
            defaults={
                'check_in_time': timezone.now(),
                'gps_location': gps_location,
                'status': 'pending'
            }
        )

        if not created:
            return Response({"error": "Already clocked in today."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"message": "Clocked in successfully.", "attendance_id": attendance.id}, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def clock_out(self, request, pk=None):
        contract = self.get_object()
        proof_photo_url = request.data.get('proof_photo_url', '')

        today = timezone.now().date()
        try:
            attendance = AttendanceRecord.objects.get(contract=contract, date=today)
            if attendance.check_out_time:
                return Response({"error": "Already clocked out."}, status=status.HTTP_400_BAD_REQUEST)
            
            attendance.check_out_time = timezone.now()
            attendance.proof_photo_url = proof_photo_url
            attendance.save()
            return Response({"message": "Clocked out successfully."})
        except AttendanceRecord.DoesNotExist:
            return Response({"error": "Not clocked in today."}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def approve_attendance(self, request, pk=None):
        contract = self.get_object()
        attendance_id = request.data.get('attendance_id')

        try:
            attendance = AttendanceRecord.objects.get(id=attendance_id, contract=contract)
            if attendance.status == 'approved':
                return Response({"error": "Attendance already approved."}, status=status.HTTP_400_BAD_REQUEST)

            # Approve attendance
            attendance.status = 'approved'
            attendance.save()

            # Payout Logic
            wage = contract.final_wage
            if contract.escrow_balance < wage:
                return Response({"error": "Insufficient escrow balance."}, status=status.HTTP_400_BAD_REQUEST)

            # Deduct from escrow
            contract.escrow_balance -= wage
            contract.save()

            # Create Payout Transaction
            transaction = PaymentTransaction.objects.create(
                contract=contract,
                amount=wage,
                transaction_type='payout',
                status='completed',
                reference_id=str(uuid.uuid4())
            )

            return Response({
                "message": "Attendance approved. Funds released to worker.",
                "transaction_id": transaction.id,
                "remaining_escrow": contract.escrow_balance
            })

        except AttendanceRecord.DoesNotExist:
            return Response({"error": "Attendance record not found."}, status=status.HTTP_404_NOT_FOUND)
