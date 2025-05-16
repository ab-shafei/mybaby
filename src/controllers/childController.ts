import { Request, Response, NextFunction } from "express";
import {
  createChild,
  updateChild,
  deleteChild,
  getAllChildren,
  getChildById,
} from "../services/childServices";

// Add Child
export const addChild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    childName,
    guardianName,
    nationalID,
    childAge,
    birthDate,
    bloodType,
    childHealthStatus,
    childChronicDiseases,
    childGender,
  } = req.body;

  try {
    const childRecord = await createChild({
      userId,
      childName,
      guardianName,
      nationalID,
      childAge,
      birthDate,
      bloodType,
      childHealthStatus,
      childChronicDiseases,
      childGender,
    });

    res.status(201).json({
      childRecord,
      message: "Child added successfully",
    });
  } catch (error) {
    console.error("Failed to add child", error);
    next(error);
  }
};

// Update Child
export const editChild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    childId,
    childName,
    guardianName,
    nationalID,
    childAge,
    birthDate,
    bloodType,
    childHealthStatus,
    childChronicDiseases,
  } = req.body;

  try {
    const updatedChildRecord = await updateChild({
      userId,
      childId,
      childName,
      guardianName,
      nationalID,
      childAge,
      birthDate,
      bloodType,
      childHealthStatus,
      childChronicDiseases,
    });

    res.status(200).json({
      updatedChildRecord,
      message: "Child updated successfully",
    });
  } catch (error) {
    console.error("Failed to update child", error);
    next(error);
  }
};

// Delete Child
export const removeChild = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, childId } = req.body;

  try {
    const deletedChildRecord = await deleteChild({
      userId,
      childId,
    });

    res.status(200).json({
      deletedChildRecord,
      message: "Child deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete child", error);
    next(error);
  }
};

// Get All Children for a User
export const fetchAllChildren = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const childrenList = await getAllChildren({ userId });

    res.status(200).json({
      childrenList,
      message: "Children fetched successfully",
    });
  } catch (error) {
    console.error("Failed to fetch children", error);
    next(error);
  }
};

// Get Specific Child by ID
export const fetchChildById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, childId } = req.params;

  try {
    const childData = await getChildById({ userId, childId });

    res.status(200).json({
      childData,
      message: "Child fetched successfully",
    });
  } catch (error) {
    console.error("Failed to fetch child", error);
    next(error);
  }
};
