import request from "supertest";
import { app } from "../../app";

it("fails when an email which is not in db is sent", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "doka@dmail.com",
      password: "yes this will fail",
    })
    .expect(400);
});

it("fails when an incorrect password is sent", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "doka@dmail.com",
      password: "yes this will fail",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "doka@dmail.com",
      password: "failed",
    })
    .expect(400);
});

it("responds witha  coockie when given valid creds", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "doka@dmail.com",
      password: "111111",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "doka@dmail.com",
      password: "111111",
    })
    .expect(200);
  expect(response.get("Set-Cookie")).toBeDefined();
});
