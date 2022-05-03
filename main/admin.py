from django.contrib import admin
from django.contrib.auth.models import Group
from .models import *
from django import forms
# Register your models here.


class PropertyAdmin(admin.AdminSite):
    site_header = "AB Broker Administrator"
    index_title = "Administrator"
# admin.site.site_header = "AB Broker Administrator"
# admin.site.site_title = "AB Broker Administrator"

property_admin = PropertyAdmin(name='Property Admin')

field_set = ['image', 'more', 'price', 'posted_date']


class ImageInline(admin.StackedInline):
    model = Image
    extra = 1
    template = 'custom_inline.html'

class HouseMoreInline(admin.TabularInline):
    model = HouseMore

    
class CarMoreInline(admin.StackedInline):
    model = CarMore
    



class HouseAdmin(admin.ModelAdmin):
    exclude = ['catagory']
    list_display = field_set
    inlines = [HouseMoreInline, ImageInline]
    
    
    

class CarAdmin(admin.ModelAdmin):
    list_display = field_set
    def get_form(self, request, obj=None, **kwargs):
        form = super(CarAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['catagory'].initial = 'CAR'
        form.base_fields["catagory"].widget = forms.HiddenInput()
        return form

    inlines = [CarMoreInline, ImageInline]
    
class AccountAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'email', 'phone_number']
    fieldsets = (
        ("Account Information", {
            "fields": (
                "user_name", 'first_name', 'last_name', 'bio',
            ),
        }),
         ("Contacts", {
            "fields": (
                ("telegram", 'instagram', 'tiktok', 'youtube',), ('phone_number', 'email',)
            ),
        }),
    )
    

property_admin.register(House, HouseAdmin)
property_admin.register(Car, CarAdmin)
property_admin.register(Account, AccountAdmin)


#for the system administrator
import django.apps
all_models = django.apps.apps.get_models()

for model in all_models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass

admin.site.site_header = "System Administrator"
admin.site.site_title = "AB Broker System Administrator"
admin.site.index_title = "System Administrator"