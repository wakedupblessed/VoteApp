from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .services.pollService import PollService


@api_view(['GET'])
def get_all_preview(request):
    return Response(PollService().get_all_preview())


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_available_preview(request, id):
    return Response(PollService().get_all_available_preview(id))

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_polls(request, id):
    return Response(PollService().get_user_polls(id))

@api_view(['GET'])
def get(request, id):
    return Response(PollService().get(id))


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create(request):
    error = PollService().create(request.data.get('poll_data'), request.data.get('question_data'))
    if error:
        Response(error, status=status.HTTP_400_BAD_REQUEST)

    return Response('Poll created successfully', status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete(request):
    poll_id = request.data
    if not PollService().delete(poll_id):
        return Response(f'poll {poll_id} doesnt exist', status=status.HTTP_404_NOT_FOUND)

    return Response(f'poll {poll_id} deleted', status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote(request):
    error = PollService().vote(request.data.get("answers"))
    if error:
        return Response(error, status=status.HTTP_400_BAD_REQUEST)
    return Response("voted", status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_vote_statistic(request, poll_id, user_id):
    data = PollService().get_statistics(poll_id=poll_id, user_id=user_id)
    if data is None:
        return Response(None, status=status.HTTP_400_BAD_REQUEST)

    return Response(data, status=status.HTTP_200_OK)



