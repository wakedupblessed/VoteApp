import React, { useReducer } from "react";
import styled from "styled-components";

import { QuestionDTO } from "../../api/Polls/interfaces/polls";
import { IQuestionsContainer, CustomQuestionProps } from "./interfaces";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import OpenAnswerQuestion from "./OpenAnswerQuestion";
import { StyledButton } from "../GlobalStyles";

const questionStateReducer = (
  state: Record<string, string>,
  action: {
    payload: { id: string; value: string };
  }
) => {
  return { ...state, [action.payload.id]: action.payload.value };
};

export const QuestionsContainer = (props: IQuestionsContainer) => {
  const [questionStates, dispatch] = useReducer(questionStateReducer, {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Object.entries(questionStates).forEach((element) => {
      console.log(element[0], " ", element[1]);
    });
  };

  const updateQuestionState = (id: string, value: any) => {
    dispatch({ payload: { id, value } });
  };

  const renderQuestion = (question: QuestionDTO, index: number) => {
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
        index={index + 1}
        onStateChange={updateQuestionState}
      />
    );
  };

  return (
    <QuestionContainerStyled>
      <form onSubmit={handleSubmit}>
        {props.questions.map(renderQuestion)}
        <StyledButton type='submit'>Send answers</StyledButton>
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
    gap: 10px;
  }
`;
