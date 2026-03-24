const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  getBikes,
  addBike,
  updateBike,
  toggleAvailability,
} = require("../controllers/bikeController");

// ✅ Public route
router.get("/", getBikes);

// 🔐 Protected (admin only handled inside controller)
router.post("/", auth, addBike);
router.put("/:id", auth, updateBike);
router.patch("/:id", auth, toggleAvailability);

module.exports = router;