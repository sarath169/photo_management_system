from django.db import models
from django.db.models.fields import CharField

class PopulateLocationsModel(models.Model):
    id = models.IntegerField(primary_key=True)
    latitude = models.CharField(max_length=100)
    longitude = models.CharField(max_length=100)
    location_name = models.CharField(max_length=256)
    
    class Meta:
        db_table = 'Saved_Locations'
