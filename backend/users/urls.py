from django.urls import path
from .views import CompleteProfileView, ParseWhatsappView

urlpatterns = [
    path('complete-profile/', CompleteProfileView.as_view(), name='complete_profile'),
    path('parse-whatsapp/', ParseWhatsappView.as_view(), name='parse_whatsapp'),
]
