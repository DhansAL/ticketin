import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./errors/notFoundError";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening auth service at 3000!!");
});
