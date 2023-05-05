import { createContext } from "react";
import { AuthTokens } from "../api/Auth/api";

export interface IAuthContext {
  user: any;
  registerUser: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loginUser: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
  refreshToken: (data: AuthTokens) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
