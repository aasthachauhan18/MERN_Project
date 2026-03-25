import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();


router.get(
  "/admin-only",
  protect,
  authorizeRoles("super_admin"),
  (req, res) => {
    res.json({ message: "Only Super Admin Allowed" });
  }
);


router.get(
  "/admin-dashboard",
  protect,
  authorizeRoles("super_admin", "company_admin"),
  (req, res) => {
    res.json({ message: "Admin Dashboard" });
  }
);


router.get(
  "/sales",
  protect,
  authorizeRoles("sales"),
  (req, res) => {
    res.json({ message: "Sales Page" });
  }
);

export default router;