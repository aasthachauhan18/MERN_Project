const jwt = require("jsonwebtoken");

const protect = (req,res,next)=>{

// console.log("req ",req);
console.log("req headers",req.headers);
console.log("req headers bearer",req.headers.bearer);
let token = req.headers.bearer;
// console.log("token",token);

if(token){
token = token.split(" ")[1];

// console.log("after",token);

const decoded = jwt.verify(token,process.env.JWT_SECRET);

req.user = decoded;

next();
}
else{
res.status(401).json({message:"Not authorized"});
}

}

module.exports = protect;