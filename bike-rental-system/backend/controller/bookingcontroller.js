const Booking = require("../model/Booking");
const Bike = require("../model/Bike");

exports.bookBike = async(req,res)=>{

const {bikeId,startDate,endDate,totalPrice} = req.body;

const booking = await Booking.create({

userId:req.user.id,
bikeId,
startDate,
endDate,
totalPrice

});

res.json(booking);

};

exports.getMyBookings = async(req,res)=>{

const bookings = await Booking.find({userId:req.user.id})
.populate("bikeId");

res.json(bookings);

};

exports.approveBooking = async(req,res)=>{

const booking = await Booking.findByIdAndUpdate(
req.params.id,
{status:"approved"},
{new:true}
);

res.json(booking);

};

exports.returnBike = async(req,res)=>{

const booking = await Booking.findByIdAndUpdate(
req.params.id,
{status:"returned"},
{new:true}
);

res.json(booking);

};