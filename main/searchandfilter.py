from django_filters import FilterSet, AllValuesFilter
from django_filters import DateTimeFilter, NumberFilter, CharFilter
from .models import *


class CarFilter(FilterSet):
	from_year = NumberFilter(field_name='carmore__year', lookup_expr='gte')
	to_year = NumberFilter(field_name='carmore__year', lookup_expr='lte')
	min_price = NumberFilter(field_name='price', lookup_expr='gte')
	max_price = NumberFilter(field_name='price', lookup_expr='lte')
	transsmission = CharFilter(field_name='carmore__transmission', lookup_expr="iexact")
	
	class Meta:
		model = Car
		fields = ('from_year', 'to_year', 'min_price', 'max_price', 'transsmission',)

class HouseFilter(FilterSet):
	min_room = NumberFilter(field_name='housemore__bed_rooms', lookup_expr='gte')
	max_room = NumberFilter(field_name='housemore__bed_rooms', lookup_expr='lte')
	min_price = NumberFilter(field_name='price', lookup_expr='gte')
	max_price = NumberFilter(field_name='price', lookup_expr='lte')

    
	class Meta:
		model = House
		fields = ('min_room', 'max_room', 'min_price', 'max_price',)
