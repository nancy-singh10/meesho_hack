from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, mobile_number, password=None, **extra_fields):
        if not mobile_number:
            raise ValueError('The Mobile Number field must be set')
        user = self.model(mobile_number=mobile_number, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, mobile_number, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(mobile_number, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('worker', 'Worker'),
        ('employer', 'Employer'),
        ('admin', 'Admin'),
    )
    mobile_number = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='worker')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'mobile_number'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.mobile_number

class WorkerProfile(models.Model):
    STATE_CHOICES = (
        ('language_selection', 'Language Selection'),
        ('menu', 'Menu'),
        ('intake', 'Intake'),
        ('toli_preference', 'Toli Preference'),
        ('distance_preference', 'Distance Preference'),
        ('job_selection', 'Job Selection'),
        ('negotiating', 'Negotiating'),
        ('working', 'Working'),
    )
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='worker_profile')
    bot_state = models.CharField(max_length=50, choices=STATE_CHOICES, default='language_selection')
    shram_id = models.CharField(max_length=50, unique=True, blank=True, null=True)
    trust_score = models.IntegerField(default=700)
    jobs_completed = models.IntegerField(default=0)
    total_earned = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    toli_size = models.IntegerField(default=1)
    location = models.CharField(max_length=255, blank=True, null=True)
    skills = models.JSONField(default=list, blank=True)
    experience_years = models.IntegerField(default=0)
    language = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f"{self.user.name} - {self.shram_id}"

class EmployerProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='employer_profile')
    company_name = models.CharField(max_length=255, blank=True, null=True)
    fraud_predictor_score = models.IntegerField(default=100)

    def __str__(self):
        return self.company_name or self.user.name or self.user.mobile_number
