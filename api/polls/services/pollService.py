from uuid import uuid4
from polls.jsonProcessors import PollSerializer, ShortUserSerializer, QuestionSerializer, OptionSerializer, \
    PollDeserializer, QuestionDeserializer, OptionDeserializer, AnswerDeserializer
from polls.models import QuestionType, Option, Question, Poll, Answer
from django.contrib.auth.models import User
from datetime import datetime


class PollService:
    def get(self, id):
        """
        Returns poll by id
        """
        poll = Poll.objects.get(id=id)
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
        return serialized_data

    def get_all_preview(self):
        """
        Gets all non-private polls preview
        """
        current_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        polls = Poll.objects.filter(is_private=False, end_date__gte=current_date).all()
        data = []
        for poll in polls:
            data.append({"id": poll.id, "title": poll.title, "author": ShortUserSerializer(poll.author).data,
                         "endDate": poll.end_date})
        return data

    def get_all_available_preview(self, id):
        """
        Gets all polls available for specific user
        """
        current_date = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        polls = Poll.objects.filter(responders=id, end_date__gte=current_date).all()
        data = []
        for poll in polls:
            data.append({"id": poll.id, "title": poll.title, "author": ShortUserSerializer(poll.author).data,
                         "endDate": poll.end_date})
        return data

    def get_user_polls(self, id):
        """
        Gets all polls available for specific user
        """
        polls = Poll.objects.filter(author=id).all()
        data = []
        for poll in polls:
            data.append({"id": poll.id, "title": poll.title, "author": ShortUserSerializer(poll.author).data,
                         "endDate": poll.end_date})
        return data

    def create(self, poll_request_data, question_request_data):
        """
        Creates a poll
        Returns error string or None if successful
        """
        poll = PollDeserializer(data=poll_request_data)
        if poll.is_valid():
            poll.validated_data["id"] = uuid4().hex
            if poll.validated_data["is_private"] and len(poll.validated_data["responders"]) < 1:
                return "private poll must have responders"
            poll.save()

            for question_data in question_request_data:
                question = QuestionDeserializer(data=question_data.get("question_info"))
                if question.is_valid():
                    question.validated_data["poll_id"] = poll.validated_data["id"]
                    question.validated_data["id"] = uuid4().hex
                    question.save()

                    if question.validated_data["question_type"] != "OpenAnswer":
                        try:
                            option_data_list = question_data.get('option_data')
                            for option_data in option_data_list:
                                option = OptionDeserializer(data=option_data)
                                if option.is_valid():
                                    option.validated_data["question_id"] = question.validated_data["id"]
                                    option.validated_data["id"] = uuid4().hex
                                    option.save()
                                else:
                                    Poll.objects.get(id=poll.validated_data["id"]).delete()
                                    return "invalid option"
                        except TypeError:
                            Poll.objects.get(id=poll.validated_data["id"]).delete()
                            return "single/multiple question must have options"

                else:
                    return "invalid question"
            return None
        else:
            return poll.errors
        return "invalid poll"

    def get_statistics(self, poll_id, user_id):
        """
        Returns poll and percentage vote option
        If no votes in poll, returns None
        """
        poll = Poll.objects.get(id=poll_id)
        if not Answer.objects.filter(question=Question.objects.filter(poll=poll).first(), user_id=user_id):
            return None

        serialized_data = {"poll_data": PollSerializer(poll).data}
        serialized_data["poll_data"]['author'] = ShortUserSerializer(poll.author).data
        serialized_data["poll_data"]['responders'] = [ShortUserSerializer(responder).data for responder in
                                                      poll.responders.all()]
        try:
            question_data = []
            for question in Question.objects.filter(poll=poll):
                if question.question_type == QuestionType.OPEN_ANSWER.value:
                    # add all users open answers
                    open_answer_data = []
                    answers = list(Answer.objects.filter(question=question).all())
                    # if not isinstance(answers, list):
                    # answers = [answers]
                    for answer in answers:
                        if poll.is_anonymous:
                            open_answer_data.append({"username": None, "answer": answer.open_answer})
                        else:
                            open_answer_data.append({"username": User.objects.filter(id=answer.user_id).get().username, "answer": answer.open_answer})
                    question_data.append({
                        "question_info": QuestionSerializer(question).data,
                        "option_data": open_answer_data
                    })
                elif question.question_type == QuestionType.SINGLE_OPTION.value:
                    option_data = []
                    for option in Option.objects.filter(question=question):
                        option_info = OptionSerializer(option).data
                        option_info["votes_percent"] = round(100 * Answer.objects.filter(question=question,
                                                                                         single_option=option).count() / Answer.objects.filter(
                            question=question).count())
                        option_data.append(option_info)
                    question_data.append({
                        "question_info": QuestionSerializer(question).data,
                        "option_data": option_data
                    })
                else:
                    option_data = []
                    for option in Option.objects.filter(question=question):
                        option_info = OptionSerializer(option).data
                        count_vote_current_option = 0
                        count_vote_all_option = 0
                        answers = Answer.objects.filter(question=question)
                        for answer in answers:
                            for item in answer.multiple_options.all():
                                count_vote_all_option += 1
                                if item == option:
                                    count_vote_current_option += 1
                        option_info["votes_percent"] = round(100 * count_vote_current_option / count_vote_all_option)
                        option_data.append(option_info)
                    question_data.append({
                        "question_info": QuestionSerializer(question).data,
                        "option_data": option_data
                    })
        except (ZeroDivisionError, ValueError) as e:
            x = e
            return None

        serialized_data['question_data'] = question_data
        return serialized_data

    def vote(self, answers_data):
        """
        Saves answer data in poll
        Returns error string or None if successful
        """
        answers = []
        for answer in answers_data:
            answer = AnswerDeserializer(data=answer)
            if answer.is_valid():
                if Answer.objects.filter(question=answer.validated_data["question"],
                                         user=answer.validated_data["user"]).exists():
                    return "user has already voted"
                answer.validated_data["id"] = uuid4().hex
                answers.append(answer)
            else:
                return f"invalid answer {answer.errors}"

        # check if same user vote
        set_user_ids = {answer.validated_data["user"].id for answer in answers}
        if len(set_user_ids) > 1:
            return "one user must vote once at a poll"

        # all question answered
        set_poll_ids = {answer.validated_data["question"].poll_id for answer in answers}
        if len(set_poll_ids) > 1:
            return "questions must be from same poll"
        poll_id = set_poll_ids.pop()
        available_question_ids = [available_question.id for available_question in
                                  Question.objects.filter(poll=poll_id).all()]
        questions_ids = [answer.validated_data["question"].id for answer in answers]
        if len(available_question_ids) != len(answers) or [id for id in available_question_ids if
                                                           id not in questions_ids]:
            return "invalid questions query"

        # matching: option - question - answer
        for answer in answers:
            available_option_ids = [option.id for option in
                                    Option.objects.filter(question=answer.validated_data["question"].id)]
            current_option_ids = [option.id for option in answer.validated_data["multiple_options"]]
            if answer.validated_data["single_option"]:
                current_option_ids.append(answer.validated_data["single_option"].id)
            if len(current_option_ids) > 0:
                answer.validated_data["open_answer"] = None
                if len(available_option_ids) < len(current_option_ids) or [id for id in current_option_ids if
                                                                           id not in available_option_ids]:
                    return "invalid matching: option - question - answer"

        [answer.save() for answer in answers]
        poll = Poll.objects.filter(id=poll_id).get()
        poll.number_of_vote += 1
        poll.save()
        return None

    def delete(self, id):
        """
        Deletes a user by id
        """
        if not Poll.objects.filter(id=id).exists():
            return False

        Poll.objects.get(id=id).delete()
        return True
