import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = "testestestsetest";
  mongoServer = await MongoMemoryServer.create();
  const mongoURI = mongoServer.getUri();
  await mongoose.connect(mongoURI, {});
});

beforeEach(async () => {
  const colllections = await mongoose.connection.db.collections();
  for (const collection of colllections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "doka@dmail.com";
  const password = "111111";
  const res = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);
  const cookie = res.get("Set-Cookie");
  return cookie;
};
