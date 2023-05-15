import styled from "styled-components";

import CustomLink from "../CustomLink/CustomLink";
import { gradientAnimation } from "../GlobalStyles";
import { useContext } from "react";
import AuthContext from "../../сontext/AuthContext";

export const Header = () => {
  const { user, logoutUser } = useContext(AuthContext)!;

  return (
    <HeaderArea>
      <NavLinkContainer>
        <CustomLink label='Home' route='/' />
        <CustomLink label='Create' route='/polls/create' />
      </NavLinkContainer>
      <NavAccountLinks>
        {user ? (
          <>
            <StyledUserName>Hello, {user.name}</StyledUserName>
            <CustomLink label='Log out' route='/' onClick={logoutUser} />
          </>
        ) : (
          <>
            <CustomLink label='Log in' route='/login' />
            <CustomLink label='Sign up' route='/signup' />
          </>
        )}
      </NavAccountLinks>
    </HeaderArea>
  );
};

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

const StyledUserName = styled.div`
  display: inline-block;
  color: #000;
  padding: 0 40px 0 0;
  font-size: 24px;
`;
