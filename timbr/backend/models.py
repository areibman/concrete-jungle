from django.db import models

# Create your models here.

class CoordinatesRequested(models.Model):
    latitude = models.DecimalField(max_digits=17, decimal_places=14)
    longitude = models.DecimalField(max_digits=17, decimal_places=14)
    request_time = models.DateTimeField(auto_now_add=True)
    ibm_classification = models.FloatField(blank=True)
    user_agrees_with_classification = BooleanField(blank=True)
