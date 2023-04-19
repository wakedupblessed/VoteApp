import styled from "styled-components";

import HeaderLink from "../HeaderLink/HeaderLink";
import { gradientAnimation } from "../GlobalStyles";

export const Header = () => {
  return (
    <HeaderArea>
      <NavLinkContainer>
        <HeaderLogo />
        <HeaderLink
          label='Home'
          onClick={() => {
            alert("work 1");
          }}
        />
        <HeaderLink
          label='Polls'
          onClick={() => {
            alert("work 2");
          }}
        />
      </NavLinkContainer>
      <NavAccountLinks>
        <HeaderLink
          label='Log in'
          onClick={() => {
            alert("log in");
          }}
        />
        <HeaderLink
          label='Sign up'
          onClick={() => {
            alert("sign up");
          }}
        />
      </NavAccountLinks>
    </HeaderArea>
  );
};

const HeaderLogo = styled.img`
  src: url();
`;

const HeaderArea = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 150px;
  height: 100px;

  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
`;

const NavLinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavAccountLinks = styled.div`
  display: flex;
  justify-content: space-between;
`;
