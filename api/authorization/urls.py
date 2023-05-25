from django.urls import path
from .views import getRoutes, CustomTokenObtainPairView, RegisterView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('', getRoutes),

    path('/register', RegisterView.as_view(), name='register'),
    path('/token', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
