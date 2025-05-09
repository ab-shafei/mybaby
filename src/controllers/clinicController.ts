import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/AppError";

import {
  createClinic,
  getAllClinics,
  searchClinics,
} from "../services/clinicService";

export const createClinicHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { clinicName, clinicAddress, field, description, image, phone } =
    req.body;

  try {
    const clinicRecord = await createClinic({
      clinicName,
      clinicAddress,
      field,
      description,
      image,
      phone,
    });

    res
      .status(201)
      .json({ message: "Clinic created successfully", clinicRecord });
  } catch (error) {
    next(error);
  }
};

export const getAllClinicsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clinics = await getAllClinics();
    res.status(200).json(clinics);
  } catch (error) {
    next(error);
  }
};

export const searchClinicsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search } = req.query;

  try {
    if (!search || typeof search !== "string") {
      throw new AppError(400, "Search query is required.");
    }

    const results = await searchClinics(search);
    res.status(200).json({ results });
  } catch (error) {
    next(error);
  }
};
