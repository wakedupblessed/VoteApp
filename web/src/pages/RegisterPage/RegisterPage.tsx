import { useContext } from "react";
import styled from "styled-components";

import { StyledInput, StyledButton } from "../../components/GlobalStyles";
import AuthContext from "../../сontext/AuthContext";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext)!;

  return (
    <RegisterFormContainer onSubmit={registerUser}>
      <StyledInput
        type='text'
        name='email'
        placeholder='Enter email'
        required
      />
      <StyledInput
        type='text'
        name='username'
        placeholder='Enter username'
        required
      />
      <StyledInput
        type='password'
        name='password'
        placeholder='Enter password'
        required
      />
      <StyledInput
        type='password'
        name='confirmPassword'
        placeholder='Confirm password'
        required
      />
      <StyledButton type='submit'>Register</StyledButton>
    </RegisterFormContainer>
  );
};

export default RegisterPage;

const RegisterFormContainer = styled.form`
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
