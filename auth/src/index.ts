import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true, //ingress proxy something
  })
);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);
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
