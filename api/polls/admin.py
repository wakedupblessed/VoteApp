from django.contrib import admin
from .models import Poll, Question, Option, Answer

# Register your models here.
admin.site.register(Poll)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Answer)