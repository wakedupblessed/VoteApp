from rest_framework.decorators import api_view
from rest_framework import serializers, status
from .models import Poll, Question, Option
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.response import Response


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
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


def create_question(data):
    question = QuestionSerializer(data=data.get("question_info"))

    if not question.is_valid():
        raise Exception("abtoiba")
    if Question.objects.filter(**data).exists():
        raise Exception("avtoiba")

    question.save()
    question_id = Question.objects.get(title=question.data["title"]).id

    for option_data in data.get('option_data'):
        option_data["question"] = question_id
        if not create_option(option_data):
            raise Exception("option-related bebra")

    return True


def create_option(data):
    option = OptionSerializer(data=data)

    if not option.is_valid():
        raise Exception("option not  valid")
    if Option.objects.filter(**data).exists():
        raise Exception("option  exists")

    option.save()
    return True


@api_view(['POST'])
def create(request):
    poll = PollSerializer(data=request.data.get('poll_data'))

    if Poll.objects.filter(**request.data["poll_data"]).exists():
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    for question_data in request.data.get('question_data'):
        if not create_question(question_data):
            raise Exception("question-related bebra")

    if poll.is_valid():
        poll.save()
        return Response(poll.data)

    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['DELETE'])
def delete(request, id):
    if not Poll.objects.filter(id=id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    Poll.objects.get(id=id).delete()
    return Response(status=status.HTTP_200_OK)


#add responder to poll and answer
def vote(request, id):
    return HttpResponse(status=status.HTTP_200_OK)
