import { auth } from "../utils/firebase";
import axios from "axios";

export const signupUser = async (email: string, password: string) => {
  const userRecord = await auth.createUser({ email, password });

  return userRecord;
};

export const signinUser = async (email: string, password: string) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return {
    idToken: response.data.idToken,
    refreshToken: response.data.refreshToken,
    expiresIn: response.data.expiresIn,
  };
};

export const refreshIdToken = async (refreshToken: string) => {
  const response = await axios.post(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`,
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return {
    idToken: response.data.id_token,
    refreshToken: response.data.refresh_token,
    expiresIn: response.data.expires_in,
  };
};
