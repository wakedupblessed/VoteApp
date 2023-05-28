import React from "react";
import styled from "styled-components";
import { Trash3 as Trash } from "react-bootstrap-icons";

import { ArrowRight } from "react-bootstrap-icons";
import { gradientAnimation } from "../GlobalStyles";

interface PollPreviewProps {
  title: string;
  author: string;
  endDate: string;
  onPollClick: any;
  onPollDelete?: any | null;
}

export const PollPreview = ({
  title,
  author,
  endDate,
  onPollClick,
  onPollDelete,
}: PollPreviewProps) => {
  const handleDelete = (e) => {
    e.preventDefault();
    onPollDelete();
  };

  return (
    <Container>
      <Header>{title}</Header>
      {onPollDelete && <StyledTrash onClick={handleDelete} />}
      <StyledArrowRight onClick={onPollClick} />
      <Info>
        <p>Author - {author}</p>
        <p>Avalible till - {endDate || ""}</p>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 35px);
  height: fit-content;
  margin-top: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
  color: #000;
  border-radius: 3px;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    top: calc(-1 * 3px);
    left: calc(-1 * 3px);
    height: calc(100% + 3px * 2);
    width: calc(100% + 3px * 2);
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    border-radius: calc(2 * 3px);
    z-index: -1;
    animation: ${gradientAnimation} 15s ease infinite;
    background-size: 400% 400%;
  }
`;

const Header = styled.div`
  font-size: 28px;
  font-weight: 500;
`;

const StyledArrowRight = styled(ArrowRight)`
  font-size: 26px;
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
`;

const StyledTrash = styled(Trash)`
  font-size: 26px;
  position: absolute;
  top: 50%;
  right: 75px;
  transform: translateY(-50%);
`;

const Info = styled.div`
  margin-top: 10px;
  & > p {
    font-size: 18px;
  }
`;
