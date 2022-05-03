from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

app_name = 'main_api'

router= DefaultRouter()

router.register('car', CarViewSet, basename='car')
router.register('house', HouseViewSet, basename='house')
router.register('property', FrontPage, basename='property')

urlpatterns = [

    path('', include(router.urls)),
    path('about/<int:pk>', About.as_view(), name='about')

]

