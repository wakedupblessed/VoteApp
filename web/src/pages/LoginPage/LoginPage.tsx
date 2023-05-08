import { useContext } from "react";
import AuthContext from "../../сontext/AuthContext";
import React from "react";
import styled from "styled-components";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)!;

  return (
    <LoginFormContainer onSubmit={loginUser}>
      <LoginFormElement>
      <label htmlFor="username">Username</label>
      <StyledInput type="text" name="username" placeholder="Enter username" />
      </LoginFormElement>
      <LoginFormElement>
      <label htmlFor="username">Username</label>
      <StyledInput type="password" name="password" placeholder="Enter password" />
      </LoginFormElement>
      <StyledLoginButton type="submit">Submit</StyledLoginButton>
    </LoginFormContainer>
  );
};

export default LoginPage;

const StyledInput = styled.input`
  width: 200px;
  font-size: 16px;
`;

const StyledLoginButton = styled.button`
  width: fit-content;

  padding: 12px 20px;
  border-radius: 40px;
  font-size: 14px;
  color: #fff;
  font-weight: normal;
  background-color: #000;
  line-height: 16px;
  border: none;
`;

const LoginFormElement = styled.div`
  font-size: 18px;
  width: 200px;
`;

const LoginFormContainer = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
