import { Router } from "express";
import {
  createClinicHandler,
  getAllClinicsHandler,
  searchClinicsHandler,
} from "../controllers/clinicController";

const router = Router();

router.post("/", createClinicHandler);
router.get("/", getAllClinicsHandler);
router.get("/search", searchClinicsHandler);

export default router;
