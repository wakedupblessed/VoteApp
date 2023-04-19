import styled from "styled-components";
import { Question, QuestionType } from "../../api/Polls/interfaces";
import { ReactNode } from "react";

export const QuestionsContainer = (questions: Question[]) => {
  const renderQuestion = (question: Question) => {
    let QuestionComponent;
  
    switch (question.type) {
      case QuestionType.SingleChoice:
        QuestionComponent = OneChoiceQuestion;
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
      <QuestionComponent id={question.id}>
        {question.title}
      </QuestionComponent>
    );
  };

  return <QuestionContainerStyled>{questions.map(renderQuestion)}</QuestionContainerStyled>;
};

interface CustomQuestionProps {
  id: string;
  children: ReactNode;
}

const OpenAnswerQuestion = ({id, children}: CustomQuestionProps) => {
  return <OpenAnswerQuestionStyled id={id}>{children}</OpenAnswerQuestionStyled>;
};

const OpenAnswerQuestionStyled = styled.div``;

const MultipleChoiceQuestion = ({id, children}: CustomQuestionProps) => {
  return <MultipleChoiceQuestionStyled id={id}>{children}</MultipleChoiceQuestionStyled>;
};

const OneChoiceQuestion = ({id, children}: CustomQuestionProps) => {
  return <OneChoiceQuestionStyled id={id}>{children}</OneChoiceQuestionStyled>;
};

const OneChoiceQuestionStyled = styled.div``;

const MultipleChoiceQuestionStyled = styled.div``;

const QuestionContainer = styled.div`

`;


const QuestionContainerStyled = styled.div`

`;
