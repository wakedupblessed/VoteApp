import axios from "axios";
import { TOKEN_URL, REFRESH_URL, REGISTER_URL } from "./constants";

export interface AuthTokens {
  access: string;
  refresh: string;
}

export class AuthApi {
  static async fetchToken(
    username: string,
    password: string
  ): Promise<AuthTokens | null> {
    try {
      const response = await axios.post(TOKEN_URL, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async refreshToken(token: string): Promise<AuthTokens | null> {
    try {
      const response = await axios.post(REFRESH_URL, {
        refresh: token,
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  static async registerUser(username: string, password: string) {
    try {
      console.log({
        username,
        password,
      });

      const response = await axios.post(REGISTER_URL, {
        username,
        password,
      });

      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      return null;
    }
  }
}
