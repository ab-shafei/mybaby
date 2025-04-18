import { Router } from "express";
import {
  signup,
  signin,
  requestRefreshIdToken,
} from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/token", requestRefreshIdToken);

export default router;
