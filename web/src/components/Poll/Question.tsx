import styled from "styled-components";
import { Question, QuestionType } from "../../api/Polls/interfaces";
import { ReactNode } from "react";

interface IQuestionsContainer {
  questions: Question[];
}

export const QuestionsContainer = (props: IQuestionsContainer) => {
  const renderQuestion = (question: Question) => {
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
      <QuestionComponent key={question.id}>{question.title}</QuestionComponent>
    );
  };

  return (
    <QuestionContainerStyled>
      {props.questions.map(renderQuestion)}
    </QuestionContainerStyled>
  );
};

interface CustomQuestionProps {
  key: string;
  children: ReactNode;
}

const OpenAnswerQuestion = (props: CustomQuestionProps) => {
  return <OpenAnswerQuestionStyled>{props.children}</OpenAnswerQuestionStyled>;
};

const OpenAnswerQuestionStyled = styled.div``;

const MultipleChoiceQuestion = (props: CustomQuestionProps) => {
  return (
    <MultipleChoiceQuestionStyled>
      {props.children}
    </MultipleChoiceQuestionStyled>
  );
};

const MultipleChoiceQuestionStyled = styled.div``;

const SingleChoiceQuestion = (props: CustomQuestionProps) => {
  return (
    <SingleChoiceQuestionStyled>
      {props.children}
      <input type='text' />
    </SingleChoiceQuestionStyled>
  );
};

const SingleChoiceQuestionStyled = styled.div``;

const QuestionContainer = styled.div``;

const QuestionContainerStyled = styled.div``;
