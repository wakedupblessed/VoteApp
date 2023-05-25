from django.urls import path,  include
from django.contrib import admin

urlpatterns = [
    path('polls', include('polls.urls')),
    path('auth', include('authorization.urls')),
    path('admin', admin.site.urls),
]
