from django.db import models

# Create your models here.

class CoordinatesRequested(models.Model):
    latitude = models.DecimalField(max_digits=17, decimal_places=14)
    longitude = models.DecimalField(max_digits=17, decimal_places=14)
    request_time = models.DateTimeField(auto_now_add=True)
    ibm_fig_classification = models.FloatField(blank=True)
    ibm_prickly_pear_classification = models.FloatField(blank=True)
    user_confirmation_fig = BooleanField(blank=True)
    user_confirmation_prickly_pear = BooleanField(blank=True)
