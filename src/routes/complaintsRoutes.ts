import { Router } from "express";
import { submitComplaint } from "../controllers/complaintsController";

const router = Router();

router.post("/", submitComplaint);

export default router;
