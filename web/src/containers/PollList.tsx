import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { format } from "date-fns";

import { PollApi } from "../api/Polls/api";
import { PollPreviewDTO } from "../api/Polls/interfaces/polls";
import { PollPreview } from "../components/PollPreview/PollPreview";

export const PollList = () => {
  const [polls, setPolls] = useState<PollPreviewDTO[] | null>(null);
  const navigate = useNavigate();

  async function getResponse() {
    const result = await PollApi.getAllPreview();

    if (result && result.length > 0) {
      setPolls(result);
    }
  }

  useEffect(() => {
    getResponse();
  }, []);

  return (
    <Container>
      <Header>Share your opinion</Header>
      {polls &&
        polls.map((item: PollPreviewDTO) => (
          <PollPreview
            key={item.id}
            title={item.title}
            author={item.author.username}
            endDate={format(new Date(item.endDate), "dd MMMM yyyy")}
            onPollClick={() => navigate("/polls/" + item.id)}
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
