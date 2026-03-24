import express from "express";
import { register, login , getUsers } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.get("/users",getUsers)
router.post("/login", login);

export default router;