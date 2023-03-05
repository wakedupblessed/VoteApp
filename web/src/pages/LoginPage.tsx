import React from "react";

const LoginPage = () => {
  return (
    <form>
      <input type='text' name='username' placeholder='Enter the username' />
      <input type='password' name='password' placeholder='Enter the password' />
      <input type='submit' />
    </form>
  );
};

export default LoginPage;
