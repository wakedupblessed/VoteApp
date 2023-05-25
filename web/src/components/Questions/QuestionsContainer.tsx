import React, { useReducer } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { QuestionDTO } from "../../api/Polls/interfaces/polls";
import { QuestionAnswer } from "../../api/Polls/interfaces/polls";
import { IQuestionsContainer, CustomQuestionProps } from "./interfaces";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import OpenAnswerQuestion from "./OpenAnswerQuestion";
import { StyledButton } from "../GlobalStyles";
import useAuthContext from "../../сontext/hooks";
import { PollApi } from "../../api/Polls/api";

const questionStateReducer = (
  state: Record<string, QuestionAnswer>,
  action: {
    payload: QuestionAnswer;
  }
) => {
  return { ...state, [action.payload.question_id]: action.payload };
};

export const QuestionsContainer = (props: IQuestionsContainer) => {
  const [questionStates, dispatch] = useReducer(questionStateReducer, {});
  const { user, authTokens } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const questionsAnswers = Object.values(questionStates);
    console.log(questionsAnswers);

    if (authTokens) {
      const result = await PollApi.vote(
        {
          answers: questionsAnswers,
        },
        authTokens.access
      );

      if (result) {
        navigate("/");
      } else {
        alert("Some thing went wrong");
      }
    }
  };

  const updateQuestionState = (question: QuestionAnswer) => {
    if (user) {
      question.user_id = user.user_id;
      dispatch({ payload: question });
    }
  };

  const renderQuestion = (question: QuestionDTO) => {
    let QuestionComponent: React.ComponentType<CustomQuestionProps>;

    switch (question.question_info.question_type) {
      case "SingleChoice":
        QuestionComponent = SingleChoiceQuestion;
        break;
      case "MultipleChoice":
        QuestionComponent = MultipleChoiceQuestion;
        break;
      case "OpenAnswer":
        QuestionComponent = OpenAnswerQuestion;
        break;
      default:
        return null;
    }

    return (
      <QuestionComponent
        key={question.question_info.id}
        data={question}
        onStateChange={updateQuestionState}
      />
    );
  };

  return (
    <QuestionContainerStyled>
      <form onSubmit={handleSubmit}>
        {props.questions.map(renderQuestion)}
        <StyledButton type="submit">Send answers</StyledButton>
      </form>
    </QuestionContainerStyled>
  );
};

const QuestionContainerStyled = styled.div`
  padding: 0px 15px;
  display: flex;
  flex-direction: column;

  & > form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;
