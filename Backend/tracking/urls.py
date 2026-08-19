from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    PublicTrackingView,
    ShipmentViewSet,
    StaffTokenObtainPairView,
)

router = DefaultRouter()
router.register("admin/shipments", ShipmentViewSet, basename="shipment")

urlpatterns = [
    path("auth/login/", StaffTokenObtainPairView.as_view(), name="staff-login"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path(
        "tracking/<str:tracking_code>/",
        PublicTrackingView.as_view(),
        name="public-tracking",
    ),
    path("", include(router.urls)),
    path('admin/', admin.site.urls),
]