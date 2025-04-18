import { Router } from "express";
import { reserveAppointment } from "../controllers/appointmentController";

const router = Router();

router.post("/", reserveAppointment);
// router.get("/", getAppointments);
// router.get("/:appointmentId", getAppointment);
// router.delete("/:appointmentId", deleteAppointment);

export default router;
