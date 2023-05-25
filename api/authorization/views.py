from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.views import APIView
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer
from polls.jsonProcessors import ShortUserSerializer
from django.contrib.auth.models import User


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_users(request):
    users = []
    for user in User.objects.all():
        users.append(ShortUserSerializer(user).data)
    data = {}
    data["users"] = [users]
    return Response(data, status=status.HTTP_200_OK)