import { AppError } from "../middlewares/AppError";
import { auth, db } from "../utils/firebase";
import axios from "axios";

export const signupUser = async ({
  email,
  password,
  firstName,
  lastName,
  address,
  phoneNumber,
  nationalNumber,
  birthDate,
  gender = "mail",
  major,
  syndicateCardImage,
  role = "USER",
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  nationalNumber: string;
  birthDate: string;
  gender?: string;
  major?: string;
  syndicateCardImage?: string;
  role: "DOCTOR" | "USER";
}) => {
  const userRecord = await auth.createUser({ email, password });

  const user = await db.collection("users").add({
    userId: userRecord.uid,
    email,
    firstName,
    lastName,
    address,
    phoneNumber,
    nationalNumber,
    birthDate,
    gender,
    major,
    syndicateCardImage,
    role,
  });

  return { firebaseUser: userRecord, user };
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

  const usersRef = db.collection("users");
  const snapshot = (
    await usersRef.where("email", "==", email).get()
  ).docs[0].data();

  if (snapshot.empty) {
    throw new AppError(404, "User not found");
  }

  return {
    idToken: response.data.idToken,
    refreshToken: response.data.refreshToken,
    expiresIn: response.data.expiresIn,
    user: snapshot,
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
