# accounts/urls.py

from django.urls import path
from . import views  # You will create these views next

app_name = "accounts"

urlpatterns = [
    # Corresponds to: POST /accounts/auth/otp/generate/
    path("auth/otp/generate/", views.GenerateOTPView.as_view(), name="generate-otp"),
    
    # Corresponds to: POST /accounts/auth/otp/verify/
    path("auth/otp/verify/", views.VerifyOTPView.as_view(), name="verify-otp"),
]
