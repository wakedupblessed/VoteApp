import styled from "styled-components";
import { Question, QuestionType, Option } from "../../api/Polls/interfaces";
import { ReactNode, useState } from "react";

interface IQuestionsContainer {
  questions: Question[];
}

interface CustomQuestionProps {
  key: string;
  data: Question;
  index: number;
}

interface BaseQuestionProps {
  title: string;
  index: number;
  children: ReactNode;
}

export const QuestionsContainer = (props: IQuestionsContainer) => {
  const renderQuestion = (question: Question, index: number) => {
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
      <QuestionComponent key={question.id} data={question} index={index + 1} />
    );
  };

  return (
    <QuestionContainerStyled>
      {props.questions.map(renderQuestion)}
    </QuestionContainerStyled>
  );
};

export const BaseQuestion: React.FC<BaseQuestionProps> = ({
  title,
  index,
  children,
}) => (
  <>
    <QuestionTitleStyled>
      {index}. {title}
    </QuestionTitleStyled>
    {children}
  </>
);

const OpenAnswerQuestion = (props: CustomQuestionProps) => {
  return (
    <OpenAnswerQuestionStyled>
      <BaseQuestion index={props.index} title={props.data.title}>

      </BaseQuestion>
    </OpenAnswerQuestionStyled>
  );
};

const OpenAnswerQuestionStyled = styled.div``;

const MultipleChoiceQuestion = (props: CustomQuestionProps) => {
  return (
    <MultipleChoiceQuestionStyled>
      <BaseQuestion index={props.index} title={props.data.title}>

      </BaseQuestion>
    </MultipleChoiceQuestionStyled>
  );
};

const MultipleChoiceQuestionStyled = styled.div``;

const SingleChoiceQuestion = (props: CustomQuestionProps) => {
  const [values, setValues] = useState({ gender: "" });
  const genders = ["male", "female", "other"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Gender: ${values.gender}`);
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }
  return (
    <SingleChoiceQuestionStyled>
      <BaseQuestion index={props.index} title={props.data.title}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="gender">Gender:</label>
            {genders.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={values.gender === option}
                  onChange={handleRadioChange}
                />
                {option}
              </label>
            ))}
          </div>

          <button type="submit">Submit</button>
        </form>
      </BaseQuestion>
    </SingleChoiceQuestionStyled>
  );
};

const SingleOptionStyled = styled.input`
  type: "radio";
`;

const QuestionTitleStyled = styled.p``;

const SingleChoiceQuestionStyled = styled.div``;

const QuestionContainerStyled = styled.div`
  padding: 5px 15px;
`;
