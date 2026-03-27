import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Menu from "../models/Menu.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashed,
    role: "user",
  });

  res.json({
    message: "User registered successfully",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let menuAccessData = [];

    if (user.role === "superadmin") {
      menuAccessData = await Menu.find();
    } else {
      menuAccessData = await Menu.find({
        roles: user.role,
      });
    }

    menuAccessData = menuAccessData.map((menu) => ({
      ...menu.toObject(),
      path: menu.path?.startsWith("/") ? menu.path : `/${menu.path}`,
    }));
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        menuAccess: menuAccessData,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log("🔥 LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  res.json(req.user);
};
