from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, ContractViewSet

router = DefaultRouter()
router.register(r'contracts', ContractViewSet, basename='contract')
router.register(r'', JobViewSet, basename='job')

urlpatterns = [
    path('', include(router.urls)),
]
