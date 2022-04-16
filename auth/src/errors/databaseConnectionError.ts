export class DatabaseConnectionError extends Error {
  reason = "error connecting to the database";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
