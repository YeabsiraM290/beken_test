from rest_framework import viewsets, generics, filters
from .models import *
from .serializers import *
from .custom_paginator import CustomPagination
from .searchandfilter import CarFilter, HouseFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q


class About(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    

class CarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.all().order_by('-id')
    serializer_class = CarSerializer
    pagination_class = CustomPagination
    filter_backends = (DjangoFilterBackend, )
    filter_class = CarFilter

    
class HouseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = House.objects.all().order_by('-id')
    serializer_class = HouseSerializer
    pagination_class = CustomPagination
    filter_backends = (DjangoFilterBackend, )
    filter_class = HouseFilter
    

class FrontPage(viewsets.ReadOnlyModelViewSet):
    # queryset = Property.objects.filter(post_on_font_page=True).all().order_by('-id')
    pagination_class = CustomPagination
    serializer_class = PropertySerializer
   
    def get_queryset(self):
        queryset = Property.objects.filter(post_on_font_page=True).all().order_by('-id')
        keyword = self.request.query_params.get('search')
        if keyword:
            queryset = queryset.filter(Q(header__icontains= keyword) | Q(discription__icontains=keyword)).all()
        return queryset
    
