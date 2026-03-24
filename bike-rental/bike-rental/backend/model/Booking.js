const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // ✅ Proper references
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bikeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
      required: true,
    },

    // ✅ Dates (correct type)
    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    days: {
      type: Number,
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    // ✅ Status flow
    status: {
      type: String,
      enum: ["Pending", "Active", "Completed", "Cancelled"],
      default: "Pending",
    },

    // ✅ Payment info (VERY IMPORTANT)
    payment: {
      method: String,
      amount: Number,
      paidAt: Date,
    },
  },
  { timestamps: true } // ✅ adds createdAt, updatedAt
);

module.exports = mongoose.model("Booking", bookingSchema);