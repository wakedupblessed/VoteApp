from .views import index, create, get, get_all, delete, vote, get_preview, get_all_preview
from django.urls import path, re_path

urlpatterns = [
    path('', get_all),
    path('/create', create),
    re_path(r'^/(?P<id>[a-zA-Z0-9]+)$', get),
    re_path(r'^/get_preview/(?P<id>[a-zA-Z0-9]+)$', get_preview),
    re_path(r'^/get_preview', get_all_preview),
    re_path(r'^/delete/(?P<id>[a-zA-Z0-9]+)$', delete),
    re_path(r'^/vote/(?P<id>[1-9]\d*)$', vote),
]
