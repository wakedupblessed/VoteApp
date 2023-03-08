from django.http import HttpResponse


def index(request):
    return HttpResponse("polls index")


def create(request):
    return HttpResponse(f"polls create")


def get(request, id):
    return HttpResponse(f"polls get {id}")


def update(request, id):
    return HttpResponse(f"polls update {id}")


def delete(request, id):
    return HttpResponse(f"polls delete {id}")


def vote(request, id):
    return HttpResponse(f"polls vote {id}")
