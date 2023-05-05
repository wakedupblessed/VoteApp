import { useContext } from "react";
import AuthContext from "../../сontext/AuthContext";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext)!;

  return (
    <form onSubmit={registerUser}>
      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' name='username' required />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' required />
      </div>
      <div>
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input type='password' name='confirmPassword' required />
      </div>
      <button type='submit'>Register</button>
    </form>
  );
};

export default RegisterPage;
