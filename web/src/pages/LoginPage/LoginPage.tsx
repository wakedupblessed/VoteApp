import { useContext } from "react";
import styled from "styled-components";

import { StyledInput, StyledButton } from "../../components/GlobalStyles";
import useAuthContext from "../../сontext/hooks";

const LoginPage = () => {
  const { loginUser } = useAuthContext();

  return (
    <LoginFormContainer onSubmit={loginUser}>
      <StyledInput type='text' name='username' placeholder='Enter username' />
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
