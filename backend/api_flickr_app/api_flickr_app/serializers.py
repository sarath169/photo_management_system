from rest_framework import serializers
from .models import PopulateLocationsModel

class PopulateLocationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopulateLocationsModel
        fields = ('location_name')