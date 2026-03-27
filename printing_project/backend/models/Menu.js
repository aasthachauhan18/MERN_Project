import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: String,
    path: String,
    roles: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);