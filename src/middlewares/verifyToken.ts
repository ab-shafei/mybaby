import { Request, Response, NextFunction } from "express";
import { auth } from "../utils/firebase";
import { DecodedIdToken } from "firebase-admin/auth";

export interface AuthenticatedRequest extends Request {
  user: DecodedIdToken;
}

export const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ error: "No token provided" });

  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
