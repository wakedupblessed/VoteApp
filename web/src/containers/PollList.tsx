import { useState, useEffect } from "react";
import styled from "styled-components";

import { IPoll } from "../api/Polls/interfaces";
import { PollApi } from "../api/Polls/api";
import { PollPreview } from "../components/PollPreview/PollPreview";
import { useNavigate } from "react-router";

export const PollList = () => {
  const [polls, setPolls] = useState<IPoll[] | null>(null);
  const navigate = useNavigate();

  async function getResponse() {
    const result = await PollApi.getAll(true);

    if (result?.items && result?.items.length > 0) {
      setPolls(result.items);
    }
  }

  useEffect(() => {
    getResponse();
  }, []);

  const renderPollItems = () => {
    return polls?.map((item) => {
      return (
        <>
          <PollPreview
            key={item.id}
            {...item}
            onPollClick={() => navigate("/polls/" + item.id)}
          ></PollPreview>
        </>
      );
    });
  };

  return (
    <Container>
      <Header>Share your opinion</Header>
      {renderPollItems()}
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
