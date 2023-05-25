import { createContext } from "react";
import { AuthTokens } from "../api/Auth/api";
import { User } from "../api/Auth/interfaces";

export interface IAuthContext {
  user: User | null;
  authTokens: AuthTokens | null;
  registerUser: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  loginUser: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logoutUser: () => void;
  refreshToken: (data: AuthTokens) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export default AuthContext;
