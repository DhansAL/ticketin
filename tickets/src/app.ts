import { errorHandler, NotFoundError, currentUser } from "@dticketin/common";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import "express-async-errors";
import { createTicketRouter } from "./routes/new";

// env verifications
// if (!process.env.JWT_KEY) throw new Error("env -- jwt key is not defined");

export const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

// routes
app.use(createTicketRouter);

//middlewares
app.use(currentUser);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);
