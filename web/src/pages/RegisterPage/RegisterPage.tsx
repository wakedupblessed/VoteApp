import { useContext } from "react";
import AuthContext from "../../сontext/AuthContext";
import styled from "styled-components";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext)!;

  return (
    <RegisterFormContainer onSubmit={registerUser}>
      <RegisterFormElement>
        <label htmlFor="username">Username</label>
        <StyledInput type="text" name="username" required />
      </RegisterFormElement>
      <RegisterFormElement>
        <label htmlFor="password">Password</label>
        <StyledInput type="password" name="password" required />
      </RegisterFormElement>
      <RegisterFormElement>
        <label htmlFor="confirmPassword">Confirm password</label>
        <StyledInput type="password" name="confirmPassword" required />
      </RegisterFormElement>
      <StyledRegisterButton type="submit">Register</StyledRegisterButton>
    </RegisterFormContainer>
  );
};

export default RegisterPage;

const StyledInput= styled.input`
  width: 200px;
  font-size:16px;
`;


const StyledRegisterButton = styled.button`
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

const RegisterFormElement = styled.div`
font-size: 18px;
  width: 200px;
`;

const RegisterFormContainer = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
