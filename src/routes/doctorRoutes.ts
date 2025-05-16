import { Router } from "express";
import {
  addDoctor,
  editDoctor,
  fetchDoctorById,
  fetchAllDoctors,
  fetchDoctorsBySearch,
} from "../controllers/doctorController";

const router = Router();

router.post("/", addDoctor);
router.put("/", editDoctor);
router.get("/", fetchAllDoctors);
router.get("/search", fetchDoctorsBySearch);
router.get("/:doctorId", fetchDoctorById);

export default router;
