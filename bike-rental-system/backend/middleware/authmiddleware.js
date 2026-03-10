const jwt = require("jsonwebtoken");

const protect = (req,res,next)=>{

let token = req.headers.authorization;

if(token){
token = token.split(" ")[1];

const decoded = jwt.verify(token,process.env.JWT_SECRET);

req.user = decoded;

next();
}
else{
res.status(401).json({message:"Not authorized"});
}

}

module.exports = protect;