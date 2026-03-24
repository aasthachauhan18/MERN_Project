const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = await Booking.create({
    ...req.body,
    userId: req.user.id,
  });
  res.json(booking);
};

exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id });
  res.json(bookings);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "Cancelled" },
    { new: true }
  );
  res.json(booking);
};

exports.approveBooking = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: "Active" },
    { new: true }
  );
  res.json(booking);
};