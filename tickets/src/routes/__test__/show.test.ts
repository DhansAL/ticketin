import request from "supertest";
import { app } from "../../app";

it("returns a 404 if a ticket is not found", async () => {
  await request(app).get("/api/tickets/fakeidfake").send().expect(404);
});
it("returns the ticket if a ticket is not found", async () => {});
