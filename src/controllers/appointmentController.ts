import { Request, Response, NextFunction } from "express";
import {
  createAppointment,
  deleteAppointment,
} from "../services/appointmentService";

export const reserveAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const {user} = req.user
  const {
    doctorId,
    childName,
    guardianName,
    childAge,
    guardianPhone,
    date,
    time,
    childGender,
  } = req.body;

  try {
    const appointmenmtRecord = await createAppointment({
      doctorId,
      childName,
      guardianName,
      childAge,
      guardianPhone,
      date,
      time,
      childGender,
    });
    res.status(201).json({
      appointmenmtRecord,
      message: "Appointment resevered successfully",
    });
  } catch (error) {
    console.error("Appointment Failed to be resevered", error);
    next(error);
  }
};

export const cancelAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const {user} = req.user
  const { appointmentId } = req.params;
  try {
    const appointmenmtRecord = await deleteAppointment({
      appointmentId,
    });
    res.status(201).json({
      appointmenmtRecord,
      message: "Appointment Cancelled successfully",
    });
  } catch (error) {
    console.error("Appointment Failed to be cancelled", error);
    next(error);
  }
};
