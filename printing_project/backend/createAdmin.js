import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hash = await bcrypt.hash("123456", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hash,
      role: "superadmin",
    });

    console.log("✅ Admin created:", admin.email);
    console.log("✅ Admin created:", admin.password);

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

createAdmin();