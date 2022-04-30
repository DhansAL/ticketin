import mongoose from "mongoose";
import { app } from "./app";

////env validations
if(!process.env.JWT_KEY) throw new Error("JWT KEY must be defined")
if(!process.env.MONGO_URI) throw new Error("MONGO URI must be defined")


const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("connection ok dsds");
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  console.log("listening tickets service at 30 00");
});
dbConnection();
