const Bike = require("../models/Bike");

// ✅ GET ALL BIKES
exports.getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch bikes" });
  }
};

// ✅ ADD BIKE (ADMIN ONLY)
exports.addBike = async (req, res) => {
  try {
    // 🔐 Role check
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Admin only" });
    }

    const bike = await Bike.create(req.body);
    res.json(bike);

  } catch (err) {
    res.status(500).json({ msg: "Failed to add bike" });
  }
};

// ✅ UPDATE BIKE
exports.updateBike = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Admin only" });
    }

    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!bike) return res.status(404).json({ msg: "Bike not found" });

    res.json(bike);

  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
};

// ✅ TOGGLE AVAILABILITY
exports.toggleAvailability = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Admin only" });
    }

    const bike = await Bike.findById(req.params.id);

    if (!bike) return res.status(404).json({ msg: "Bike not found" });

    bike.available = !bike.available;
    await bike.save();

    res.json(bike);

  } catch (err) {
    res.status(500).json({ msg: "Toggle failed" });
  }
};