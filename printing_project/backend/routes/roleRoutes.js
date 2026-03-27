import express from "express";
import Role from "../models/Role.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const role = await Role.create(req.body);
  res.json(role);
});

router.get("/", async (req, res) => {
  const roles = await Role.find();
  res.json(roles);
});

export default router;