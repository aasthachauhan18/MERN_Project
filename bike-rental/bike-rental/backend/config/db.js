import mongoose from "mongoose";
import fs from "fs";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB Failed");

    const dateTime = new Date();
    const errorText = `
Connection Failed
Date-Time: ${dateTime}
Error: ${error.message}
`;

    fs.appendFileSync("connection-error.txt", errorText);
    process.exit(1);
  }
};

export default connectDB;