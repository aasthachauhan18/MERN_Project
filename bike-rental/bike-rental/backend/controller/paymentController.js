const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

exports.pay = async (req, res) => {
  try {
    const { bookingId, amount, method } = req.body;

    if (!bookingId || !amount || !method) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const payment = await Payment.create({
      bookingId,
      amount,
      method,
      status: "Success",
      transactionId: "TXN" + Date.now(),
      paidAt: new Date(),
    });

    booking.status = "Active";
    booking.payment = {
      method,
      amount,
      paidAt: new Date(),
    };

    await booking.save();

    res.json({
      msg: "Payment successful",
      payment,
      booking,
    });

  } catch (err) {
    res.status(500).json({ msg: "Payment failed" });
  }
};