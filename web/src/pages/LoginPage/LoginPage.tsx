import { useContext } from "react";
import styled from "styled-components";

import { StyledInput, StyledButton } from "../../components/GlobalStyles";
import AuthContext from "../../сontext/AuthContext";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)!;

  return (
    <LoginFormContainer onSubmit={loginUser}>
      <StyledInput type='email' name='email' placeholder='Enter email' />
      <StyledInput
        type='password'
        name='password'
        placeholder='Enter password'
      />
      <StyledButton type='submit'>Login</StyledButton>
    </LoginFormContainer>
  );
};

export default LoginPage;

const LoginFormContainer = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  & > div {
    font-size: 18px;
    width: 200px;
  }
`;
