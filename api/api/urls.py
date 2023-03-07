from django.contrib import admin
from django.urls import path
from . import views
from django.urls import path,  include

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('auth/', include('authorization.urls'))
]
