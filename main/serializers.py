from rest_framework import serializers
from .models import *


#Image serializer

class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Image


# Car serializer
class CarMoreSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('brand', 'car_model', 'condition',
                  'transmission', 'year')

        model = CarMore


class CarSerializer(serializers.ModelSerializer):

    more = CarMoreSerializer()
    images = serializers.StringRelatedField(many=True)
    # img = ImageSerializer()

    

    class Meta:
        fields = ('id', 'header', 'catagory', 'discription', 'price', 'images', 'more')
        read_only_fields = ['id', 'catagory']
        model = Car


# House serializer

class HouseMoreSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('bed_rooms', 'floors', 'location','size')
        model = HouseMore


class HouseSerializer(serializers.ModelSerializer):

    more = HouseMoreSerializer()
    images = serializers.StringRelatedField(many=True)
    class Meta:
        fields = ('id', 'header', 'catagory', 'discription', 'price', 'images', 'more')
        read_only_fields = ['id', 'catagory']
        model = House

class PropertySerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True)
    class Meta:
        fields = ('id', 'header', 'catagory', 'discription', 'price', 'images')
        read_only_fields = ['id', 'catagory']
        model = Property



class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["email", "phone_number", "first_name", "last_name", "bio", "telegram", "instagram", "tiktok", "youtube", "twitter"]
        model = Account