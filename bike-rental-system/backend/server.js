const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
res.send("Server Working");
});

app.use("/auth",require("./routes/authroutes"));
app.use("/bikes",require("./routes/bikeroutes"));
app.use("/bookings",require("./routes/bookingroutes"));

app.listen(5000,()=>{
console.log("Server running on port 5000");
});