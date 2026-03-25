import express from "express";
import { register, login, getUsers } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// ✅ Public routes
router.post("/register", register);
router.post("/login", login);

// 🔐 Protected (Admin only)
router.get("/users", protect, getUsers);

export default router;