import { useContext } from "react";
import AuthContext from "../../сontext/AuthContext";
import React from "react";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext)!;

  return (
    <form onSubmit={loginUser}>
      <input type='text' name='username' placeholder='Enter username' />
      <input type='password' name='password' placeholder='Enter password' />
      <input type='submit' />
    </form>
  );
};

export default LoginPage;
