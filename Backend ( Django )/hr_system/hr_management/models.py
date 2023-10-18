from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(unique=True)  # Use 'email' as the default username field
    group = models.CharField(max_length=20, choices=[('HR', 'HR'), ('Normal Employee', 'Normal Employee')], null=False, blank=False)

    REQUIRED_FIELDS = ['group','first_name','last_name']  # Specify required fields
    USERNAME_FIELD = 'email'  # Designate the 'email' field as the default username field