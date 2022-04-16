import { NextFunction, Request, Response } from "express";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import { RequestValidationError } from "../errors/requestValidationError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
      return res.status(400).send({ errors: formattedErrors });
    });
  }
  if (err instanceof DatabaseConnectionError) {
    console.log("databse error");
  }

  res.status(400).send({
    message: err.message,
  });
};
