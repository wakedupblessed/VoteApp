from .views import index, create, get, update, delete, vote
from django.urls import path, re_path

urlpatterns = [
    path('', index),
    path('create', create),
    re_path(r'^(?P<id>[1-9]\d*)$', get),
    re_path(r'^update/(?P<id>[1-9]\d*)$', update),
    re_path(r'^delete/(?P<id>[1-9]\d*)$', delete),
    re_path(r'^vote/(?P<id>[1-9]\d*)$', vote),
]
