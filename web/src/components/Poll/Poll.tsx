import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { DefaultContainer, FullTimeGradientContainer } from "../GlobalStyles";
import { QuestionsContainer } from "../Questions/QuestionsContainer";
import { PollDTO } from "../../api/Polls/interfaces/polls";
import CustomLink from "../CustomLink/CustomLink";
import useAuthContext from "../../сontext/hooks";

export const Poll = (poll: PollDTO) => {
  const { poll_data, question_data } = poll;
  const { user } = useAuthContext();

  return (
    <Container>
      <DefaultContainer>
        <PollTitle>{poll_data.title}</PollTitle>
        <PollDescription>{poll_data.description}</PollDescription>
        <PollAuthor>
          Provided by <u>{poll_data.author.username}</u>
        </PollAuthor>
        <AdditionalData>
          Avalible till {format(new Date(poll_data.end_date), "dd MMMM yyyy")}
        </AdditionalData>
        <AdditionalData>
          Total participation {poll_data.number_of_vote}
        </AdditionalData>
      </DefaultContainer>
      <FullTimeGradientContainer>
        {!user && (
          <>
            <BlurredView />
            <NonBlurredContent>
              <h1>Poll participation not permitted</h1>
              <LinkContainer>
                <CustomLink label='Register' route='/signup' />
                <CustomLink label='Login' route='/login' />
              </LinkContainer>
            </NonBlurredContent>
          </>
        )}
        <QuestionsContainer questions={question_data}></QuestionsContainer>
      </FullTimeGradientContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: 20px;
  }
`;

const BlurredView = styled(Content)`
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
`;

const NonBlurredContent = styled(Content)``;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PollTitle = styled.h1`
  font-size: 48px;
  font-weight: normal;
  margin-bottom: 5px;
`;

const PollDescription = styled.h2`
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 5px;
`;

const PollAuthor = styled.p`
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 5px;
`;

const AdditionalData = styled.p`
  font-size: 16px;
  font-weight: normal;
`;
