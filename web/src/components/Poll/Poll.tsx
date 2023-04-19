import styled from "styled-components";

const poll = {
    Title: 
};


export const Poll = (poll: object) => {
    const pollTitleStyle = {
        margin: 0,

    };
  return (
    <PollContainer>
      <PollInfo>
        <h3 style={pollTitleStyle}>poll.Title</h3>
      </PollInfo>
    </PollContainer>
  );
};


const PollContainer = styled.div`
  min-height: 500px;
  display: flex;
  margin: 20px 0;
  --borderWidth: 2px;
  background: #fff;
  position: relative;
  border-radius: var(--borderWidth);

  &:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 15s ease infinite;
    background-size: 400% 400%;
  }
  
  @keyframes animatedgradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const PollInfo = styled.div`
  border-radius: var(--borderWidth);
  display: flex;
  background-color: #000;
  color: #fff;
  width: 100%;
  
  &.h3{
    color: #000;

  }
`;
