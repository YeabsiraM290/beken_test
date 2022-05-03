"""core URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from main.admin import property_admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from django.views.generic import TemplateView


urlpatterns = [
    path('sysadmin/', admin.site.urls),
    path('admin/', property_admin.urls),
    path('api/', include('main.urls', namespace='main_api')),
    path('', lambda request: render(request, 'index.html')),
    path('home', lambda request: render(request, 'index.html')),
    path('car', lambda request: render(request, 'car.html')),
    path('house', lambda request: render(request, 'house.html')),
    path('contact', lambda request: render(request, 'contact.html')),
    path('search', lambda request: render(request, 'search.html')),
    path('detail', lambda request: render(request, 'detail.html'))
   
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)
        urlpatterns += staticfiles_urlpatterns()
