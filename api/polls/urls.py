from .views import create, get, get_all, delete, vote, get_all_preview, get_all_available_preview, \
    get_vote_statistic, get_user_polls
from django.urls import path, re_path

urlpatterns = [
    path('', get_all),
    path('/create', create),
    path('/vote', vote),
    path('/delete', delete),
    re_path(r'^/(?P<id>[a-zA-Z0-9]+)$', get),
    re_path(r'^/available/(?P<id>[a-zA-Z0-9]+)$', get_all_available_preview),
    re_path(r'^/get_preview', get_all_preview),
    re_path(r'^/user/(?P<id>[a-zA-Z0-9]+)$', get_user_polls),
    re_path(r'^/get_vote_statistic/(?P<poll_id>[a-zA-Z0-9]+)/(?P<user_id>[0-9]+)$', get_vote_statistic),
]
