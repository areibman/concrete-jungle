from django.db import models


class CoordinatesRequested(models.Model):
    latitude = models.DecimalField(max_digits=17, decimal_places=14)
    longitude = models.DecimalField(max_digits=17, decimal_places=14)
    request_time = models.DateTimeField(auto_now_add=True)
    ibm_classification = models.CharField(max_length=100, blank=True)
    user_agrees_with_classification = models.BooleanField(blank=True)

    def __str__(self):
        return self.request_time
