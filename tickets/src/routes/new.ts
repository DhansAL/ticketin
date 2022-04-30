import { requireAuth } from "@dticketin/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  res.status(200).send({ message: "haaha we got you" });
});
export { router as createTicketRouter };
