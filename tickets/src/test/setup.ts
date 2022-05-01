import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
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

global.signin = () => {
  // build a jwt payload. {id,email}
  const payload = {
    id: "lololololol",
    email: "doka@dmail.com",
  };
  // create the jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // BUILD a session object. the one which is found after decoding the cookie b64 string
  const session = { jwt: token };
  // session to json
  const sessionJSON = JSON.stringify(session);
  // take json and enccode it to b64
  const b64 = Buffer.from(sessionJSON).toString("base64");
  // return the b64 string in the full cookie form i.e

  return [`express:sess=${b64}`];
};
