from django.db import models
from users.models import EmployerProfile, WorkerProfile

class Job(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('negotiating', 'Negotiating'),
        ('contracted', 'Contracted'),
        ('completed', 'Completed'),
    )
    employer = models.ForeignKey(EmployerProfile, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    required_skills = models.JSONField(default=list)
    location = models.CharField(max_length=255)
    offered_wage = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} - {self.employer.company_name or self.employer.user.name}"

class Application(models.Model):
    STATUS_CHOICES = (
        ('matched', 'Matched'),
        ('negotiating', 'Negotiating'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
    )
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    worker = models.ForeignKey(WorkerProfile, on_delete=models.CASCADE, related_name='applications')
    match_score = models.IntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='matched')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.worker.user.name} - {self.job.title}"

class Contract(models.Model):
    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name='contract')
    worker = models.ForeignKey(WorkerProfile, on_delete=models.CASCADE, related_name='contracts')
    final_wage = models.DecimalField(max_digits=10, decimal_places=2)
    pdf_url = models.URLField(blank=True, null=True)
    employer_signed = models.BooleanField(default=False)
    worker_signed = models.BooleanField(default=False)
    escrow_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Contract for {self.job.title}"

class AttendanceRecord(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending Approval'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField(auto_now_add=True)
    check_in_time = models.DateTimeField(blank=True, null=True)
    check_out_time = models.DateTimeField(blank=True, null=True)
    gps_location = models.CharField(max_length=255, blank=True, null=True)
    proof_photo_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Attendance for {self.contract.worker.user.name} on {self.date}"

class PaymentTransaction(models.Model):
    TYPE_CHOICES = (
        ('deposit', 'Escrow Deposit'),
        ('payout', 'Wage Payout'),
        ('refund', 'Refund'),
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    contract = models.ForeignKey(Contract, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    reference_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.get_transaction_type_display()} of {self.amount} for {self.contract.job.title}"
