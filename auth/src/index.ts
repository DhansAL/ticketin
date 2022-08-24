import mongoose from "mongoose";
import { app } from "./app";
////
const start = async () => {
  console.log(process.version, "nodeversion in auth");

  if (!process.env.JWT_KEY) throw new Error("JWT KEY must be defined");
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connection ok ds");
  } catch (error) {
    console.error(error);
  }
};

app.listen(3000, () => {
  console.log("listening auth service at 30 00");
});
start();
