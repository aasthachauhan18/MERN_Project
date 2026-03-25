const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { pay } = require("../controllers/paymentController");

// ✅ Payment API
router.post("/", auth, pay);

module.exports = router;