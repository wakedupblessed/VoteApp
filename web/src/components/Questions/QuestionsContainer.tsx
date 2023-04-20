import { useReducer } from "react";
import styled from "styled-components";

import { IQuestion, QuestionType } from "../../api/Polls/interfaces";
import { IQuestionsContainer, CustomQuestionProps } from "./QuestionInterfaces";
import SingleChoiceQuestion from "./SingleChoiceQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import OpenAnswerQuestion from "./OpenAnswerQuestion";

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

  const renderQuestion = (question: IQuestion, index: number) => {
    let QuestionComponent: React.ComponentType<CustomQuestionProps>;

    switch (question.type) {
      case QuestionType.SingleChoice:
        QuestionComponent = SingleChoiceQuestion;
        break;
      case QuestionType.MultipleChoice:
        QuestionComponent = MultipleChoiceQuestion;
        break;
      case QuestionType.OpenAnswer:
        QuestionComponent = OpenAnswerQuestion;
        break;
      default:
        return null;
    }

    return (
      <QuestionComponent
        key={question.id}
        data={question}
        index={index + 1}
        onStateChange={updateQuestionState}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <QuestionContainerStyled>
        {props.questions.map(renderQuestion)}
      </QuestionContainerStyled>
      <button type='submit'>Send answers</button>
    </form>
  );
};

const QuestionContainerStyled = styled.div`
  padding: 5px 15px;
`;
