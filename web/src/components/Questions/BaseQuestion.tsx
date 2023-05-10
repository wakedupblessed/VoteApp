import styled from "styled-components";
import { BaseQuestionProps } from "./QuestionInterfaces";

const BaseQuestion: React.FC<BaseQuestionProps> = (
  props: BaseQuestionProps
) => (
  <>
    <QuestionTitleStyled>
      {props.index}. {props.title}
    </QuestionTitleStyled>
    {props.children}
  </>
);

export default BaseQuestion;

const QuestionTitleStyled = styled.p`
  margin-top: 8px;
`;
