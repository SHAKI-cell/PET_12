import { Router } from "express";
import { verifyToken, requireRole } from "../middleware/auth.js";
import {
  verifyUserValidation,
  updateProfileValidation,
} from "../middleware/validate.js";
import {
  verifyOrCreateUser,
  getUserProfile,
  updateUserProfile,
  updateUserRole,
  deleteAccount,
} from "../controllers/authController.js";

const router = Router();

// Public (token required from verifyToken middleware)
router.post("/verify", verifyToken, verifyUserValidation, verifyOrCreateUser);

// Protected routes
router.get("/profile", verifyToken, getUserProfile);
router.put("/profile", verifyToken, updateProfileValidation, updateUserProfile);
router.put("/role", verifyToken, requireRole("admin"), updateUserRole);
router.delete("/account", verifyToken, deleteAccount);

export default router;
