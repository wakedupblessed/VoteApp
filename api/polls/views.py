from rest_framework.decorators import api_view
from rest_framework import status
from django.http import HttpResponse
from rest_framework.response import Response
from .jsonProcessors import *
import uuid


@api_view(['GET'])
def get_all(request):
    polls = Poll.objects.all()
    data = []
    for poll in polls:
        serialized_data = {"poll_data": PollSerializer(poll).data}
        serialized_data["poll_data"]['author'] = ShortUserSerializer(poll.author).data
        serialized_data["poll_data"]['responders'] = [ShortUserSerializer(responder).data for responder in
                                                      poll.responders.all()]
        question_data = []
        for question in Question.objects.filter(poll=poll.id):
            if question.question_type == QuestionType.OPEN_ANSWER.value:
                question_data += [{"question_info": QuestionSerializer(question).data}]
            else:
                question_data += [{"question_info": QuestionSerializer(question).data,
                                   "option_data": [OptionSerializer(option).data for option in
                                                   Option.objects.filter(question=question.id)]}]
        serialized_data['question_data'] = question_data
        data.append(serialized_data)

    return Response(data=data)


@api_view(['GET'])
def get_all_preview(request):
    polls = Poll.objects.all()
    data = []
    for poll in polls:
        data.append({"id": poll.id, "title": poll.title, "author": ShortUserSerializer(poll.author).data, "endDate": poll.end_date})
    return Response(data)


@api_view(['GET'])
def get_preview(request, id):
    poll = Poll.objects.get(id=id)
    return Response(data={"id": id, "title": poll.title, "author": ShortUserSerializer(poll.author).data, "endDate": poll.end_date})


@api_view(['GET'])
def get(request, id):
    poll = Poll.objects.get(id=id)
    serialized_data = {"poll_data" : PollSerializer(poll).data}
    serialized_data["poll_data"]['author'] = ShortUserSerializer(poll.author).data
    serialized_data["poll_data"]['responders'] = [ShortUserSerializer(responder).data for responder in poll.responders.all()]
    question_data = []
    for question in Question.objects.filter(poll=poll.id):
        if question.question_type == QuestionType.OPEN_ANSWER.value:
            question_data += [{"question_info": QuestionSerializer(question).data}]
        else:
            question_data += [{"question_info": QuestionSerializer(question).data, "option_data":[OptionSerializer(option).data for option in Option.objects.filter(question=question.id)]}]
    serialized_data['question_data'] = question_data
    return Response(serialized_data)


@api_view(['POST'])
def create(request):
    poll = PollDeserializer(data=request.data.get('poll_data'))
    if poll.is_valid():
        poll.validated_data["id"] = uuid.uuid4().hex
        if poll.validated_data["is_private"] and len(poll.validated_data["responders"]) < 1:
            return Response("private poll must have responders", status=status.HTTP_400_BAD_REQUEST)
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
        return Response(f'poll {id} doesnt exist', status=status.HTTP_404_NOT_FOUND)

    Poll.objects.get(id=id).delete()
    return Response(f'poll {id} deleted', status=status.HTTP_200_OK)


@api_view(['POST'])
def vote(request):
    for answer in request.data.get("answers"):
        answer = AnswerDeserializer(data=answer)
        if answer.is_valid():
            answer.validated_data["id"] = uuid.uuid4().hex
            answer.save()
        else:
            return Response(data=f"invalid answer {answer.errors}")
    return Response("voted")


