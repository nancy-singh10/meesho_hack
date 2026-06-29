from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class SendOTPView(APIView):
    def post(self, request):
        mobile = request.data.get('mobile')
        if not mobile:
            return Response({"error": "Mobile number is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Here we would normally integrate with a WhatsApp API or SMS provider to send OTP
        # For now, we'll just mock a success response.
        return Response({
            "message": f"Verification code sent to {mobile} via WhatsApp",
            "mobile": mobile
        }, status=status.HTTP_200_OK)

class VerifyOTPView(APIView):
    def post(self, request):
        mobile = request.data.get('mobile')
        otp = request.data.get('otp')
        
        if not mobile or not otp:
            return Response({"error": "Mobile and OTP are required"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Mock OTP verification
        if otp == "1234":  # Dummy OTP
            user, created = User.objects.get_or_create(mobile_number=mobile)
            return Response({
                "message": "OTP verified successfully",
                "is_new_user": created,
                "user_id": user.id,
                "name": user.name
            }, status=status.HTTP_200_OK)
            
        return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
