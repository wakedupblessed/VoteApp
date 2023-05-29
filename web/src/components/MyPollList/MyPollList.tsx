import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { format } from "date-fns";

import { PollApi } from "../../api/Polls/api";
import { PollPreviewDTO } from "../../api/Polls/interfaces/polls";
import { PollPreview } from "../PollPreview/PollPreview";
import useAuthContext from "../../сontext/hooks";

export const MyPollList = () => {
  const [polls, setPolls] = useState<PollPreviewDTO[] | null>(null);
  const navigate = useNavigate();
  const { user, authTokens } = useAuthContext();

  async function getResponse() {
    if (user && authTokens) {
      let result: PollPreviewDTO[] | null = await PollApi.getUsersPoll(
        user.user_id,
        authTokens.access
      );

      if (result) {
        setPolls(result);
      }
    }
  }

  const deletePoll = async (id: string) => {
    if (user && authTokens) {
      const response = await PollApi.deletePoll(id, authTokens.access);
      if (response?.status === 200) {
        setPolls((prevPolls) => prevPolls!.filter((poll) => poll.id !== id));
      }
    }
  };

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <Container>
      <Header>Delete or view your polls here</Header>
      {polls &&
        polls.map((item: PollPreviewDTO) => (
          <PollPreview
            key={item.id}
            title={item.title}
            author={item.author.username}
            endDate={format(new Date(item.endDate), "dd MMMM yyyy")}
            onPollClick={() => navigate("/polls/" + item.id)}
            onPollDelete={() => deletePoll(item.id)}
          />
        ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  position: relative;
  left: 3px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: 400;
  font-size: 44px;
  margin-bottom: 15px;
`;

export default MyPollList;
