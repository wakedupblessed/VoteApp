import React, { ReactNode, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import AuthContext, { IAuthContext } from "./AuthContext";
import { AuthApi, AuthTokens } from "../api/Auth/api";
import { User } from "../api/Auth/interfaces";

interface Props {
  children: ReactNode;
}

const AUTH_TOKENS = `authTokens`;

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = localStorage.getItem("authTokens");
    if (tokens) {
      setAuthTokens(JSON.parse(tokens));
      setUser(jwt_decode(tokens));
    }
  }, []);

  const updateAuthStates = (data: AuthTokens) => {
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    localStorage.setItem(AUTH_TOKENS, JSON.stringify(data));
  };

  const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = event.currentTarget.elements.email.value;
    const username = event.currentTarget.elements.username.value;
    const password = event.currentTarget.elements.password.value;

    const data = await AuthApi.registerUser(email, username, password);

    if (data) {
      navigate("/login");
    } else {
      alert("Error during registration.");
    }
  };

  const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const username = event.currentTarget.elements.email.value;
    const password = event.currentTarget.elements.password.value;

    const data = await AuthApi.fetchToken(username, password);

    if (data) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem(AUTH_TOKENS, JSON.stringify(data));
      navigate("/");
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem(AUTH_TOKENS);
    navigate("/");
  };

  const refreshToken = async () => {
    if (authTokens) {
      const data = await AuthApi.refreshToken(authTokens.refresh);

      if (data) {
        updateAuthStates(data);
        navigate("/");
      } else {
        logoutUser();
      }
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      refreshToken();
    }

    const fiveMinutes = 60 * 100 * 5;

    const interval = setInterval(() => {
      if (authTokens) {
        refreshToken();
      }
    }, fiveMinutes);

    return () => {
      clearInterval(interval);
    };
  }, [authTokens, loading]);

  const contextData: IAuthContext = {
    user,
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
