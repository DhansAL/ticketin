import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/badRequestError";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { RequestValidationError } from "../errors/requestValidationError";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  // middleware
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  // controller
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) throw new BadRequestError("Email in use");

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
