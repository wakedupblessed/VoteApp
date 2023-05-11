from rest_framework.decorators import api_view
from rest_framework import serializers
from .models import Poll
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"

def index(request):
    return HttpResponse("polls index")


def create(request):
    return HttpResponse(f"polls create")


@api_view(['GET'])
def get_all(request):
    polls = Poll.objects.all()
    serialized_data = []
    for poll in polls:
        item = PollSerializer(poll).data
        item['author'] = UserSerializer(poll.author).data
        item['responders'] = [UserSerializer(responder).data for responder in poll.responders.all()]
        serialized_data.append(item)
    return Response(serialized_data)


@api_view(['GET'])
def get(request, id):
    poll = Poll.objects.get(id=id)
    serialized_data = PollSerializer(poll).data
    serialized_data['author'] = UserSerializer(poll.author).data
    serialized_data['responders'] = [UserSerializer(responder).data for responder in poll.responders.all()]
    return Response(serialized_data)


def update(request, id):
    return HttpResponse(f"polls update {id}")


def delete(request, id):
    return HttpResponse(f"polls delete {id}")


def vote(request, id):
    return HttpResponse(f"polls vote {id}")
