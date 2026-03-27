import Branch from "../models/Branch.js";

// CREATE
export const createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    res.json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find().populate("admin", "name email");
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateBranch = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteBranch = async (req, res) => {
  try {
    await Branch.findByIdAndDelete(req.params.id);
    res.json({ message: "Branch deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};