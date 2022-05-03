from django.db import models
from django.utils.translation import gettext_lazy as _
import datetime
from django.utils.html import format_html
from django.contrib import admin
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# For uploaded images folder name (to store images by date)
date = datetime.datetime.now().strftime('%b-%d-%G')

from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, password, phone_number, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, password, phone_number,  **other_fields)




    def create_user(self, email, user_name, password, phone_number, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name, phone_number=phone_number, **other_fields)
        user.set_password(password)
        user.save()
        return user


class Account(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=150, unique=True)
    user_name = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    bio = models.TextField(_(
        'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    #social links

    telegram = models.CharField(max_length=150, blank=True)
    instagram = models.CharField(max_length=150, blank=True)
    tiktok = models.CharField(max_length=150, blank=True)
    youtube = models.CharField(max_length=150, blank=True)
    twitter = models.CharField(max_length=150, blank=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['phone_number', 'email']

    def __str__(self):
        return self.user_name

# Options
class Catagory(models.TextChoices):
    HOUSE = "HOUSE", "House"
    CAR = "CAR", "Car"


class Transmission(models.TextChoices):
    MANUAL = "MANUAL", "Manual"
    AUTOMATIC = "AUTOMATIC", "Automatic"

# Parent model


class Property(models.Model):

    base_type = Catagory.HOUSE

    catagory = models.CharField(
        _("Catagory"), max_length=50, choices=Catagory.choices, default=base_type)
    header = models.CharField(_("Header"), max_length=50)
    discription = models.TextField(blank=True)
    price = models.DecimalField(max_digits=19, decimal_places=10)

    post_on_font_page = models.BooleanField(_("Post on front page"), default=True)
    posted_date = models.DateField(_("Posted on"), auto_now=True)


# Image model for accepting multiple images
class Image(models.Model):
    #name = models.CharField(max_length=255)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='Uploads/'+date)
    #default = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.image}"
    


# CAR model

class CarManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(catagory=Catagory.CAR)

    
class CarMore(models.Model):

    base_transmission = Transmission.MANUAL
    
    car = models.OneToOneField(Property, on_delete=models.CASCADE)
    brand = models.CharField(max_length=50, blank=False)
    car_model = models.CharField(max_length=50, blank=False)
    condition = models.CharField(max_length=50)
    transmission = models.CharField(
        _("transmission"), max_length=50, choices=Transmission.choices, default=base_transmission)
    year = models.IntegerField()

 
    def __str__(self):
        return format_html(f'<p><b>Condition: </b> {self.condition}</p> <p><b>Transmision: </b> {self.transmission}</p> <p><b>Brand: </b> {self.brand}</p> <p><b>Model: </b> {self.car_model}</p> <p><b>Year: </b> {self.year}</p>' )
    

    class Meta:
        verbose_name = ("CarDetails")
        

class Car(Property):
    base_type = Catagory.CAR
    objects = CarManager()


   

    @property
    def more(self):
        return self.carmore

    @admin.display
    def image(self):
        image = Image.objects.filter(property_id=self.id).first()
        return format_html(
            f'<div> <img src="http://127.0.0.1:8000/media/{image.image}" width=100% > <p style="border: 1px solid blue; font-size: 1.2rem; text-align:center;">Edit</p></div>',
        )
    
    class Meta:
        proxy = True


# House model

class HouseManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(catagory=Catagory.HOUSE)


class HouseMore(models.Model):

    house = models.OneToOneField(Property, on_delete=models.CASCADE)
    bed_rooms = models.CharField(max_length=50)
    floors = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    size = models.CharField(max_length=50)

    class Meta:
        verbose_name = ("HouseDetails")

    def __str__(self):
        return format_html(f'<p><b>Location: </b> {self.location}</p> <p><b>Size: </b> {self.size}</p> <p><b>Floor: </b> {self.floors} </p> <p><b>Bed rooms: </b> {self.bed_rooms} ')
    
        

class House(Property):
    base_type = Catagory.HOUSE
    objects = HouseManager()

    @property
    def more(self):
        return self.housemore
    
    @admin.display
    def image(self):
        image = Image.objects.filter(property_id=self.id).first()
        return format_html(
            f'<div> <img src="http://127.0.0.1:8000/media/{image.image}" width=100% > <p style="border: 1px solid blue; font-size: 1.2rem; text-align:center;">Edit</p></div>',
        )
    


    class Meta:
        proxy = True
