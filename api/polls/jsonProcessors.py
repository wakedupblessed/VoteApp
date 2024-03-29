from rest_framework import serializers
from .models import Poll, Question, Option, QuestionType, Answer
from django.contrib.auth.models import User
from datetime import datetime


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
    description = serializers.CharField(max_length=300, allow_blank=True, allow_null=True, required=False)
    number_of_vote = serializers.IntegerField(default=0)
    creation_date = serializers.DateTimeField(default=datetime.today())
    end_date = serializers.DateTimeField(allow_null=True)
    is_anonymous = serializers.BooleanField(default=False)
    is_private = serializers.BooleanField(default=False)
    responders = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        many=True,
        write_only=True
    )

    def create(self, validated_data):
        responders_data = validated_data.pop('responders')
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


class AnswerDeserializer(serializers.Serializer):
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
        write_only=True
    )
    question_id = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all(),
        source='question',
        write_only=True
    )
    single_option_id = serializers.PrimaryKeyRelatedField(
        queryset=Option.objects.all(),
        source='single_option',
        allow_null=True,
        write_only=True
    )
    multiple_options = serializers.PrimaryKeyRelatedField(
        queryset=Option.objects.all(),
        many=True,
        write_only=True
    )
    open_answer = serializers.CharField(max_length=300, allow_blank=True, allow_null=True, required=False)

    def create(self, validated_data):
        multiple_options_data = validated_data.pop('multiple_options')
        answer = Answer.objects.create(**validated_data)
        answer.multiple_options.set(multiple_options_data)
        return answer

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        question_data = validated_data.pop('question', None)
        single_option_data = validated_data.pop('single_option', None)
        multiple_options_data = validated_data.pop('multiple_options', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if user_data is not None:
            instance.user = user_data
        if question_data is not None:
            instance.question = question_data
        if single_option_data is not None:
            instance.single_option = single_option_data
        if multiple_options_data is not None:
            instance.multiple_options.set(multiple_options_data)

        instance.save()
        return instance
