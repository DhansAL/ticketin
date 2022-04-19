import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "doka@dmail.com",
      password: "111111",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "dokacom",
      password: "111111",
    })
    .expect(400);
});
it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "dokacom",
      password: "lol",
    })
    .expect(400);
});
it("returns a 400 with no credentials filled", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("returns a 400 on duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "doka@dmail.com",
      password: "111111",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "doka@dmail.com",
      password: "111111",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "doka@dmail.com",
      password: "111111",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
