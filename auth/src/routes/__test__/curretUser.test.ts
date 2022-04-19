import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async () => {
  const cookie = await signin();

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(res.body.currentUser.email).toEqual("doka@dmail.com");
});
