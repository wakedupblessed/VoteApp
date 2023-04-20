from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta
from enum import Enum


class Poll(models.Model):
    title = models.CharField(max_length=50)
    author = models.ForeignKey(User, on_delete=models.RESTRICT, related_name='authored_polls')
    description = models.CharField(max_length=300)
    number_of_vote = models.IntegerField(default=0)
    creation_date = models.DateTimeField(default=datetime.today())
    is_anonymous = models.BooleanField(default=False)
    end_date = models.DateTimeField(default=datetime.today()+timedelta(days=1))

    responders = models.ManyToManyField(User, related_name='responded_polls')


class PrivatePoll(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    pollees = models.ManyToManyField(User)


class QuestionType(Enum):
    SINGLE_OPTION = 'SingleChoice'
    MULTIPLE_OPTION = 'MultipleChoice'
    OPEN_ANSWER = 'OpenAnswer'


class Question(models.Model):
    title = models.CharField(max_length=80)
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)
    question_type = models.CharField(
        max_length=50,
        choices=[(type.value, type.name) for type in QuestionType],
        default=QuestionType.SINGLE_OPTION.value,
    )


class Option(models.Model):
    title = models.CharField(max_length=40)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)


class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_options = models.ManyToManyField(Option, blank=True)
    open_answer = models.TextField(blank=True, null=True)
