import { errorHandler, NotFoundError } from "@dticketin/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";

// env verifications
// if (!process.env.JWT_KEY) throw new Error("env -- jwt key is not defined");

export const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //enables that only https requests recieve a sweet cookie
  })
);


app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);
