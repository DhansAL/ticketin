import mongoose from "mongoose";

import { app } from "./app";
import { natsWrapper } from "./natsWrapper";

const start = async () => {
  console.log(process.version, "nodeversion in tickets");
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await natsWrapper.connect(
      "ticketing",
      "nats-ticketin",
      "http://localhost:4222"
    ); //specs mentioned in depl file of nats
    natsWrapper.client.on("close", () => {
      console.log("TICKETS- NATS connection closed.");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening tickets on port 3000!!!!!!!!");
  });
};

start();
