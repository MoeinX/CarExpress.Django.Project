# accounts/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, PhoneOTP

# This is a new serializer you need to create for the views.
# It's better to create specific serializers for input validation.
from .serializers import UserSerializer # Keep this if you use it elsewhere
from rest_framework import serializers

# Create this new serializer in accounts/serializers.py
class GenerateOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)
    national_id = serializers.CharField(max_length=10, required=False)

    def validate_phone_number(self, value):
        # Add any specific phone number validation logic here if needed
        return value

# Create this new serializer in accounts/serializers.py
class VerifyOTPSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    otp = serializers.CharField(max_length=5, min_length=5)


class GenerateOTPView(APIView):
    """
    Generates and sends an OTP to a user's phone number.
    Handles both login (phone_number only) and signup (with extra details).
    """
    def post(self, request, *args, **kwargs):
        serializer = GenerateOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        phone_number = serializer.validated_data['phone_number']
        is_signup = 'first_name' in serializer.validated_data # Check if it's a signup request

        user_exists = User.objects.filter(phone_number=phone_number).exists()

        if is_signup and user_exists:
            return Response({"detail": "A user with this phone number already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not is_signup and not user_exists:
            return Response({"detail": "User not found. Please sign up first."}, status=status.HTTP_404_NOT_FOUND)

        # Create or get the OTP. The model's save method should generate the otp code.
        # Make sure your PhoneOTP model has a method to generate a random code.
        otp = PhoneOTP.objects.create(phone_number=phone_number)
        
        # In a real application, you would send the OTP via an SMS service here.
        # For example: send_sms(phone_number, f"Your code is: {otp.otp}")
        print(f"Generated OTP for {phone_number}: {otp.otp}") # For testing purposes

        return Response({"detail": "OTP has been sent to your phone number."}, status=status.HTTP_201_CREATED)


class VerifyOTPView(APIView):
    """
    Verifies the OTP and logs in or creates a new user, returning JWT tokens.
    """
    def post(self, request, *args, **kwargs):
        serializer = VerifyOTPSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        phone_number = serializer.validated_data['phone_number']
        otp_code = serializer.validated_data['otp']

        # Find the latest valid OTP for this number
        otp_instance = PhoneOTP.objects.filter(phone_number=phone_number, is_used=False).last()

        if not otp_instance or otp_instance.is_expired or otp_instance.otp != otp_code:
            return Response({"detail": "The entered code is incorrect or has expired."}, status=status.HTTP_400_BAD_REQUEST)

        # OTP is valid, get or create the user
        # Note: We are not using the extra details (first_name, etc.) here.
        # A more robust solution might store them in the session during generation.
        # For simplicity, we are just creating a user with the phone number.
        user, created = User.objects.get_or_create(phone_number=phone_number)

        if not user.is_active:
            return Response({"detail": "User account is disabled."}, status=status.HTTP_403_FORBIDDEN)
            
        user.is_phone_verified = True
        user.save()

        # Mark OTP as used
        otp_instance.is_used = True
        otp_instance.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "detail": "Login successful.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)
