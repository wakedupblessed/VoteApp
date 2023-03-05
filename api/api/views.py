from django.http import HttpResponse


def index(request):
    return HttpResponse("OK")


def vote(request, pk):
    return HttpResponse("OK")


class PollListView:
    def get(request):
        return HttpResponse("OK")

    def post(request):
        return HttpResponse("OK")

class PollCreateView:
    def get(request):
        return HttpResponse("OK")

    def post(request):
        return HttpResponse("OK")

class PollDetailView:
    def get(request, pk):
        return HttpResponse("OK")

class PollUpdateView:
    def get(request, pk):
        return HttpResponse("OK")

    def post(request, pk):
        return HttpResponse("OK")

class PollDeleteView:
    def get(request, pk):
        return HttpResponse("OK")

    def post(request, pk):
        return HttpResponse("OK")
