from django.db import models
from django.contrib.auth.models import User


class Poll(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    number_of_vote = models.IntegerField(default=0)
    creation_date = models.DateTimeField()
    is_anonymous = models.BooleanField(default=False)

    voters = models.ManyToManyField(User, through='PollVoter')
    tags = models.ManyToManyField('polls.Tag', through='PollTag')

    def __str__(self):
        return f'{self.id} - {self.title}'


class PollVoter(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.RESTRICT)
    voter = models.ForeignKey(User, on_delete=models.RESTRICT)


class Question(models.Model):
    name = models.CharField(max_length=80)

    poll = models.ForeignKey(Poll, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id} - {self.name}'


class Option(models.Model):
    name = models.CharField(max_length=40)
    number_of_vote = models.IntegerField(default=0)
    is_correct = models.BooleanField(default=False)

    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.id} - {self.name}'


class Tag(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.id} - {self.name}'


class PollTag(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.RESTRICT)
    tag = models.ForeignKey(Tag, on_delete=models.RESTRICT)



