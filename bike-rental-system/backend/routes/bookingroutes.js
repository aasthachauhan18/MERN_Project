const express = require("express");
const router = express.Router();

const {
bookBike,
getMyBookings,
approveBooking,
returnBike
} = require("../controller/bookingcontroller");

const protect = require("../middleware/authmiddleware");

router.post("/book",protect,bookBike);
router.get("/my",protect,getMyBookings);

router.put("/approve/:id",protect,approveBooking);
router.put("/return/:id",protect,returnBike);

module.exports = router;