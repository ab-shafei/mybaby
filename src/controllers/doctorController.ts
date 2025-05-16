import { Request, Response, NextFunction } from "express";
import {
  createDoctor,
  updateDoctor,
  getDoctorById,
  getAllDoctors,
  searchDoctors,
} from "../services/doctorService";
import { AppError } from "../middlewares/AppError";

export const addDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    doctorName,
    nationalID,
    birthDate,
    field,
    description,
    image,
    doctorGender,
  } = req.body;

  try {
    const doctorRecord = await createDoctor({
      doctorName,
      nationalID,
      birthDate,
      field,
      description,
      image,
      doctorGender,
    });

    res
      .status(201)
      .json({ doctorRecord, message: "Doctor added successfully" });
  } catch (error) {
    next(error);
  }
};

export const editDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { doctorId } = req.body;
  const {
    doctorName,
    nationalID,
    birthDate,
    field,
    description,
    image,
    doctorGender,
  } = req.body;

  try {
    const updated = await updateDoctor({
      doctorId,
      doctorName,
      nationalID,
      birthDate,
      field,
      description,
      image,
      doctorGender,
    });

    res.status(200).json({ updated, message: "Doctor updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const fetchDoctorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { doctorId } = req.params;

  try {
    const doctor = await getDoctorById(doctorId);
    res.status(200).json({ doctor });
  } catch (error) {
    next(error);
  }
};

export const fetchAllDoctors = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json({ doctors });
  } catch (error) {
    next(error);
  }
};

export const fetchDoctorsBySearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search } = req.query;

  try {
    if (!search || typeof search !== "string") {
      throw new AppError(400, "Search query is required.");
    }

    const results = await searchDoctors(search);
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};
