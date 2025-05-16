import { Router } from "express";
import {
  addChild,
  editChild,
  removeChild,
  fetchAllChildren,
  fetchChildById,
} from "../controllers/childController";

const router = Router();

router.post("/", addChild);
router.put("/", editChild);
router.delete("/", removeChild);
router.get("/:userId", fetchAllChildren); // Get all children for a user
router.get("/:userId/:childId", fetchChildById); // Get specific child by ID
export default router;
