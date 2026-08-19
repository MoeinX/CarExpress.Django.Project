from django.shortcuts import get_object_or_404
from rest_framework import permissions, viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Shipment
from .serializers import (
    ShipmentSerializer,
    StaffTokenObtainPairSerializer,
)


class StaffTokenObtainPairView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = StaffTokenObtainPairSerializer


class PublicTrackingView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, tracking_code):
        shipment = get_object_or_404(
            Shipment,
            tracking_code=tracking_code.strip().upper(),
            is_active=True,
        )
        return Response(ShipmentSerializer(shipment, context={"request": request}).data)


class ShipmentViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAdminUser,)
    serializer_class = ShipmentSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    queryset = Shipment.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context