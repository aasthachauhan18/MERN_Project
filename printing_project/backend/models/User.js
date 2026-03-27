import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: [
      "superadmin",
      "companyadmin",
      "sales",
      "productionmanager",
      "operator",
      "accountant",
      "user",
    ],
    default: "user",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
  menuAccess: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
  }
]
//   roleRef: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Role",
// },
});

export default mongoose.model("User", userSchema);