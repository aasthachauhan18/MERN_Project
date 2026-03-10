const express = require("express");
const router = express.Router();

const {
getBikes,
addBike,
updateBike,
deleteBike
} = require("../controller/bikecontroller");

const protect = require("../middleware/authmiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");

router.get("/",getBikes);

router.post("/",protect,authorizeRoles("operator"),addBike);

router.put("/:id",protect,authorizeRoles("operator"),updateBike);

router.delete("/:id",protect,authorizeRoles("operator"),deleteBike);

module.exports = router;