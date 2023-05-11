from django.urls import path,  include

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('auth/', include('authorization.urls')),
    path('admin/', admin.site.urls),
]
