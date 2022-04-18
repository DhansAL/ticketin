import { CustomError } from "./customError";

export class DatabaseConnectionError extends CustomError {
  reason = "error connecting to the database";
  statusCode = 500;
  constructor() {
    super("Can't connect to database");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
