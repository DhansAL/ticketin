import { requireAuth, validateRequest } from "@dticketin/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.status(200).send({ message: "haaha we got you" });
  }
);
export { router as createTicketRouter };
