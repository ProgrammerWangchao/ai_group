
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import User

@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created and instance.email:
        send_mail(
            'Welcome to AI Tools Hub',
            f'Hi {instance.username},\n\nWelcome to AI Tools Hub! We are excited to have you on board.\n\nBest regards,\nThe AI Tools Hub Team',
            settings.DEFAULT_FROM_EMAIL,
            [instance.email],
            fail_silently=True,
        )
