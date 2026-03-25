const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: String,
    price: {
      type: Number,
      required: true,
    },
    cc: Number,

    // ✅ ADD THESE (frontend needs them)
    img: {
      type: String,
      default: "🏍️",
    },
    rating: {
      type: Number,
      default: 4.5,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);