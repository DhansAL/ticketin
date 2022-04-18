import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";
import { validateRequest } from "../middlewares/validateRequest";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password").trim().notEmpty().withMessage("you must fill a password "),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.send("Hi there!");
  }
);

export { router as signinRouter };
