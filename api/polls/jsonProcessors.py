from rest_framework import serializers
from .models import Poll, Question, Option, QuestionType
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = "__all__"


class OptionDeserializer(serializers.Serializer):
    title = serializers.CharField(max_length=80)

    def create(self, validated_data):
        return Option.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = "__all__"


class PollDeserializer(serializers.Serializer):
    title = serializers.CharField(max_length=50)
    author_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='author',
        write_only=True
    )
    description = serializers.CharField(max_length=300)
    number_of_vote = serializers.IntegerField(default=0)
    creation_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    is_anonymous = serializers.BooleanField(default=False)
    is_private = serializers.BooleanField(default=False)

    def create(self, validated_data):
        responders_data = validated_data.pop('responders', [])
        poll = Poll.objects.create(**validated_data)
        poll.responders.set(responders_data)
        return poll

    def update(self, instance, validated_data):
        responders_data = validated_data.pop('responders', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if responders_data is not None:
            instance.responders.set(responders_data)
        instance.save()
        return instance



class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"

class QuestionDeserializer(serializers.Serializer):
    title = serializers.CharField(max_length=80)
    question_type = serializers.ChoiceField(choices=[(type.value, type.name) for type in QuestionType])

    def create(self, validated_data):
        return Question.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
