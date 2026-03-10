const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({

bikeName:String,
brand:String,
model:String,
pricePerHour:Number,
pricePerDay:Number,
image:String,

available:{
type:Boolean,
default:true
},

operatorId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{timestamps:true});

module.exports = mongoose.model("Bike",bikeSchema);