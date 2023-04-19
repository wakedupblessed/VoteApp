import styled from "styled-components";
import GlobalStyles from "../GlobalStyles";

export const Footer = () => {
  return (
    <FooterArea>
      <p>Copyright ©2023 Vote App.<br/><br/>
        This is beta version of the system, please, help us to make it better.<br/>
        Share your suggestions for improvements with us - vote.app@gmail.com
      </p>
    </FooterArea>
  );
};

const FooterArea = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: #fff;
  align-items: center;
  padding: 0 40px;
  height: 120px;
  text-align: center;


  background: radial-gradient(
    circle at 24.1% 68.8%,
    rgb(30, 30, 30) 0%,
    rgb(10, 10, 10) 99.4%
  );
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
