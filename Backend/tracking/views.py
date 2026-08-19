import requests
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Shipment, ShipmentDocument
from .serializers import ShipmentSerializer

# کلید API خود را اینجا وارد کنید
CAR_API_KEY = "YOUR_CAR_API_KEY_HERE"

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_car_brands(request):
    headers = {'accept': 'application/json', 'Authorization': f'Bearer {CAR_API_KEY}'}
    try:
        response = requests.get('https://carapi.app/api/makes', headers=headers, timeout=10)
        return Response(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_car_models(request):
    make = request.GET.get('make')
    if not make:
        return Response({"error": "Make parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    headers = {'accept': 'application/json', 'Authorization': f'Bearer {CAR_API_KEY}'}
    try:
        response = requests.get(f'https://carapi.app/api/models?make={make}', headers=headers, timeout=10)
        return Response(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)