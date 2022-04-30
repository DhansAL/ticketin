import mongoose from "mongoose";
import { app } from "./app";
////
const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connection ok ds");
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  console.log("listening auth service at 30 00");
});
dbConnection();
