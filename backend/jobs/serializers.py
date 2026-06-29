from rest_framework import serializers
from .models import Job, Application, Contract, AttendanceRecord, PaymentTransaction
from users.models import WorkerProfile

class WorkerProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name', read_only=True)
    
    class Meta:
        model = WorkerProfile
        fields = ['id', 'name', 'shram_id', 'trust_score', 'jobs_completed', 'skills', 'location', 'experience_years']

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    worker_details = WorkerProfileSerializer(source='worker', read_only=True)
    
    class Meta:
        model = Application
        fields = '__all__'

class AttendanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendanceRecord
        fields = '__all__'

class PaymentTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentTransaction
        fields = '__all__'

class ContractSerializer(serializers.ModelSerializer):
    attendance_records = AttendanceRecordSerializer(many=True, read_only=True)
    transactions = PaymentTransactionSerializer(many=True, read_only=True)
    worker_details = WorkerProfileSerializer(source='worker', read_only=True)
    
    class Meta:
        model = Contract
        fields = '__all__'
