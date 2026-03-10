const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

bikeId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Bike"
},

startDate:Date,
endDate:Date,

totalPrice:Number,

status:{
type:String,
enum:["pending","approved","returned"],
default:"pending"
}

},{timestamps:true});

module.exports = mongoose.model("Booking",bookingSchema);