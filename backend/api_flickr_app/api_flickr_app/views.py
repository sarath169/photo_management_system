from rest_framework.response import Response
from rest_framework.generics import ListAPIView

from .models import PopulateLocationsModel
from .se



class PopulateLocationsView(ListAPIView):
    def get(self, request):
        locationobj = PopulateLocationsModel.objects.all()
        serializeobj = PopulateLocationsSerializer(locationobj, many = True)
        return Response(serializeobj.data)