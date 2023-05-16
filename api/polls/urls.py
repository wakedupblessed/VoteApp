from .views import index, create, get, get_all, delete, vote
from django.urls import path, re_path

urlpatterns = [
    path('', get_all),
    path('/create', create),
    re_path(r'^/(?P<id>[1-9]\d*)$', get),
    re_path(r'^/delete/(?P<id>[a-zA-Z0-9]+)$', delete),
    re_path(r'^/vote/(?P<id>[1-9]\d*)$', vote),
]
