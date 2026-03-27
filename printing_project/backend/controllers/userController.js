import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const users = await User.find().populate("branch").populate("menuAccess"); // ✅ ADD populate
  res.json(users);
};

export const createUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const user = await User.create({
    ...req.body,
    menuAccess: req.body.menuAccess || [], // ✅ ADD
  });

  res.json(user);
};

export const updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      menuAccess: req.body.menuAccess || [], // ✅ ADD
    },
    { new: true }
  );

  res.json(user);
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};