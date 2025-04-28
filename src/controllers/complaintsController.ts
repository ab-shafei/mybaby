import { Request, Response, NextFunction } from "express";
import { createComplaint } from "../services/complaintsServices";

export const submitComplaint = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { topic, subject, name, lastName, email, userId } = req.body;

  try {
    const complaintRecord = await createComplaint({
      topic,
      subject,
      name,
      lastName,
      email,
      userId,
    });

    res.status(201).json({
      complaintRecord,
      message: "Complaint submitted successfully",
    });
  } catch (error) {
    console.error("Failed to submit complaint", error);
    next(error);
  }
};
