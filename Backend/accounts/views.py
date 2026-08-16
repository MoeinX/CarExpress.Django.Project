import secrets

from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from .models import PhoneOTP, User
from .serializers import GenerateOTPSerializer, VerifyOTPSerializer


def generate_otp_code():
    return f"{secrets.randbelow(1_000_000):06d}"


class GenerateOTPView(APIView):
    """
    Generates and sends an OTP to a user's phone number.
    Handles both login (phone_number only) and signup (with extra details).
    """
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = GenerateOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        is_signup = 'first_name' in serializer.validated_data

        user_exists = User.objects.filter(phone_number=phone_number).exists()

        if is_signup and user_exists:
            return Response({"detail": "A user with this phone number already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not is_signup and not user_exists:
            return Response({"detail": "User not found. Please sign up first."}, status=status.HTTP_404_NOT_FOUND)

        raw_code = generate_otp_code()
        otp = PhoneOTP(
            phone_number=phone_number,
            purpose=(
                PhoneOTP.Purpose.VERIFY_PHONE
                if is_signup
                else PhoneOTP.Purpose.LOGIN
            ),
        )
        otp.set_code(raw_code)
        otp.save()

        print(f"Generated OTP for {phone_number}: {raw_code}")

        return Response({"detail": "OTP has been sent to your phone number."}, status=status.HTTP_201_CREATED)


class VerifyOTPView(APIView):
    """
    Verifies the OTP and logs in or creates a new user, returning JWT tokens.
    """
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone_number = serializer.validated_data['phone_number']
        otp_code = serializer.validated_data['otp']

        otp_instance = PhoneOTP.objects.filter(
            phone_number=phone_number,
            is_used=False,
        ).first()

        if not otp_instance or not otp_instance.verify(otp_code):
            return Response({"detail": "The entered code is incorrect or has expired."}, status=status.HTTP_400_BAD_REQUEST)

        user, _ = User.objects.get_or_create(phone_number=phone_number)

        if not user.is_active:
            return Response({"detail": "User account is disabled."}, status=status.HTTP_403_FORBIDDEN)
            
        user.is_phone_verified = True
        user.save(update_fields=("is_phone_verified",))

        refresh = RefreshToken.for_user(user)
        
        return Response({
            "detail": "Login successful.",
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_200_OK)
