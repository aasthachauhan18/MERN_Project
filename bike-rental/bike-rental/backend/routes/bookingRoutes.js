const router = require("express").Router();
const auth = require("../middleware/authMiddleware");

const {
  createBooking,
  getMyBookings,
  getAllBookings,     // ✅ ADD
  getBookingById,     // ✅ ADD
  cancelBooking,
  approveBooking
} = require("../controllers/bookingController");

// ✅ USER ROUTES
router.post("/", auth, createBooking);
router.get("/", auth, getMyBookings);
router.get("/:id", auth, getBookingById); // ✅ NEW

router.patch("/:id/cancel", auth, cancelBooking);

// ✅ ADMIN ROUTES
router.get("/admin/all", auth, getAllBookings); // ✅ NEW
router.patch("/:id/approve", auth, approveBooking); // admin check inside controller

module.exports = router;