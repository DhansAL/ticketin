import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);

app.listen(3000, () => {
  console.log("listening auth service at 3000 ");
});
