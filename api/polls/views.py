from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from rest_framework.response import Response
from .jsonProcessors import *
import uuid


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
        item['author'] = ShortUserSerializer(poll.author).data
        item['responders'] = [ShortUserSerializer(responder).data for responder in poll.responders.all()]
        serialized_data.append(item)
    return Response(serialized_data)


@api_view(['GET'])
def get(request, id):
    poll = Poll.objects.get(id=id)
    serialized_data = PollSerializer(poll).data
    serialized_data['author'] = ShortUserSerializer(poll.author).data
    serialized_data['responders'] = [ShortUserSerializer(responder).data for responder in poll.responders.all()]
    return Response(serialized_data)


def create_question(data, poll_id):
    question = QuestionDeserializer(data=data.get("question_info"))
    if question.is_valid():
        question.validated_data["poll_id"] = poll_id
        question.validated_data["id"] = uuid.uuid4().hex
        question.save()
        for option_data in data.get('option_data'):
            create_option(option_data, question.validated_data["id"])
        return Response({'message': 'Poll created successfully'})
    else:
        return Response(question.errors, status=status.HTTP_400_BAD_REQUEST)


def create_option(data, question_id):
    option = QuestionDeserializer(data=data.get("question_info"))
    if option.is_valid():
        option.validated_data["question_id"] = question_id
        option.validated_data["id"] = uuid.uuid4().hex
        option.save()
        return Response({'message': 'Poll created successfully'})
    else:
        return Response(option.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create(request):
    poll = PollDeserializer(data=request.data.get('poll_data'))
    if poll.is_valid():
        poll.validated_data["id"] = uuid.uuid4().hex
        poll.save()

        question_data_list = request.data.get('question_data')
        for question_data in question_data_list:
            question = QuestionDeserializer(data=question_data.get("question_info"))
            if question.is_valid():
                question.validated_data["poll_id"] = poll.validated_data["id"]
                question.validated_data["id"] = uuid.uuid4().hex
                question.save()

                if question.validated_data["question_type"] != "OpenAnswer":
                    try:
                        option_data_list = question_data.get('option_data')
                        for option_data in option_data_list:
                            option = OptionDeserializer(data=option_data)
                            if option.is_valid():
                                option.validated_data["question_id"] = question.validated_data["id"]
                                option.validated_data["id"] = uuid.uuid4().hex
                                option.save()
                            else:
                                Poll.objects.get(id=poll.validated_data["id"]).delete()
                                return Response("invalid option", status=status.HTTP_400_BAD_REQUEST)
                    except TypeError:
                        Poll.objects.get(id=poll.validated_data["id"]).delete()
                        return Response(
                            "single/multiple question must have options",
                            status=status.HTTP_400_BAD_REQUEST
                        )

            else:
                Poll.objects.get(id=poll.validated_data["id"]).delete()
                return Response("invalid question", status=status.HTTP_400_BAD_REQUEST)

        return Response('Poll created successfully', status=status.HTTP_200_OK)
    else:
        return Response("invalid poll", status=status.HTTP_400_BAD_REQUEST)



@api_view(['DELETE'])
def delete(request, id):
    if not Poll.objects.filter(id=id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    Poll.objects.get(id=id).delete()
    return Response(status=status.HTTP_200_OK)


#add responder to poll and answer
def vote(request, id):
    return HttpResponse(status=status.HTTP_200_OK)
