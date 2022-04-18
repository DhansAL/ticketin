import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/badRequestError";
import { validateRequest } from "../middlewares/validateRequest";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { Encryption } from "../services/encryption";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password").trim().notEmpty().withMessage("you must fill a password "),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("invalid credentials");
    }
    const passwordsMatch = await Encryption.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) throw new BadRequestError("invalid credentials");

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    //store it in session obj
    // req.session!.jwt = userJwt;??
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
