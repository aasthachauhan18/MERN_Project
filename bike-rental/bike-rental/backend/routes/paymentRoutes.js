const router = require("express").Router();
const { pay } = require("../controllers/paymentController");

router.post("/", pay);

module.exports = router;