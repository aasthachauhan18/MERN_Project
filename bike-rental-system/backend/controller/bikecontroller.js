const Bike = require("../model/Bike");

exports.getBikes = async(req,res)=>{
const bikes = await Bike.find();
res.json(bikes);
};

exports.addBike = async(req,res)=>{

const bike = await Bike.create({
...req.body,
operatorId:req.user.id
});

res.json(bike);

};

exports.updateBike = async(req,res)=>{

const bike = await Bike.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

res.json(bike);

};

exports.deleteBike = async(req,res)=>{

await Bike.findByIdAndDelete(req.params.id);

res.json({message:"Bike Deleted"});

};