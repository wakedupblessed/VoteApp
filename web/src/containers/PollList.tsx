import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { format } from "date-fns";

import { PollApi } from "../api/Polls/api";
import { PollPreviewDTO } from "../api/Polls/interfaces/polls";
import { PollPreview } from "../components/PollPreview/PollPreview";
import useAuthContext from "../сontext/hooks";

export const PollList = () => {
  const [polls, setPolls] = useState<PollPreviewDTO[] | null>(null);
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"all" | "allowed">("all");
  const { user, authTokens } = useAuthContext();

  async function getResponse() {
    let result: PollPreviewDTO[] | null = [];

    if (viewMode === "all") {
      result = await PollApi.getAll();
    } else if (viewMode === "allowed") {
      if (user && authTokens) {
        result = await PollApi.getAllowed(user?.user_id!, authTokens?.access!);
      }
    }

    if (result) {
      setPolls(result);
    }
  }

  useEffect(() => {
    getResponse();
  }, [viewMode]);

  return (
    <Container>
      <Header>Share your opinion</Header>
      <ButtonContainer>
        <StyledButton onClick={() => setViewMode("all")}>
          All Polls
        </StyledButton>
        {authTokens && (
          <StyledButton onClick={() => setViewMode("allowed")}>
            Polls for you
          </StyledButton>
        )}
      </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
