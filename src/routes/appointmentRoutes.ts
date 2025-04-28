import { Router } from "express";
import {
  reserveAppointment,
  cancelAppointment,
} from "../controllers/appointmentController";

const router = Router();

router.post("/", reserveAppointment);
// router.get("/", getAppointments);
// router.get("/:appointmentId", getAppointment);
router.delete("/:appointmentId", cancelAppointment);

export default router;
