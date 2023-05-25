import styled from "styled-components";
import { BaseQuestionProps } from "./interfaces";

const BaseQuestion: React.FC<BaseQuestionProps> = (
  props: BaseQuestionProps
) => (
  <Container>
    <Title>{props.title}</Title>
    <Body>{props.children}</Body>
  </Container>
);

export default BaseQuestion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
`;

const Title = styled.p`
  margin-bottom: 5px;
  font-size: 22px;
`;

const Body = styled.div`
  display: flex;
`;
