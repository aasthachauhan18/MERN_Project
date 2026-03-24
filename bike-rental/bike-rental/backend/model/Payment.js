const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // ✅ Proper relation
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    method: {
      type: String,
      enum: ["Card", "UPI", "Net Banking", "Cash"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Success", "Failed"],
      default: "Pending",
    },

    // ✅ Useful for real payments
    transactionId: {
      type: String,
    },

    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);