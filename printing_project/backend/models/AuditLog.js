import mongoose from "mongoose";

const auditSchema = new mongoose.Schema({
  user: String,
  action: String,
  module: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AuditLog", auditSchema);