import { Request, Response, NextFunction } from "express";
import {
  signupUser,
  signinUser,
  refreshIdToken,
} from "../services/authService";
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
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
  } = req.body;

  try {
    const data = await signupUser({
      email,
      password,
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
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const data = await signinUser(email, password);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};

export const requestRefreshIdToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  try {
    const data = await refreshIdToken(refreshToken);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
};
