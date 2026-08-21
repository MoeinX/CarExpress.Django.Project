from django.shortcuts import get_object_or_404
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Shipment, ShipmentDocument
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

    @action(
        detail=True,
        methods=["delete"],
        url_path=r"documents/(?P<document_id>[^/.]+)",
    )
    def delete_document(self, request, pk=None, document_id=None):
        document = get_object_or_404(
            ShipmentDocument,
            pk=document_id,
            shipment_id=pk,
        )
        document.file.delete(save=False)
        document.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)