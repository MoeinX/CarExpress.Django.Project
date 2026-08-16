from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Inquiry
from .serializers import DeliveryStatusUpdateSerializer, InquirySerializer


class InquiryViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Inquiry.objects.select_related("requested_by")
        if self.request.user.is_staff:
            return queryset
        return queryset.filter(requested_by=self.request.user)

    def get_serializer_class(self):
        if self.action == "update_delivery_status":
            return DeliveryStatusUpdateSerializer
        return InquirySerializer

    def perform_create(self, serializer):
        serializer.save(requested_by=self.request.user)

    @action(
        detail=True,
        methods=("patch",),
        url_path="delivery-status",
        permission_classes=(permissions.IsAdminUser,),
    )
    def update_delivery_status(self, request, pk=None):
        inquiry = self.get_object()
        serializer = self.get_serializer(
            inquiry,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
