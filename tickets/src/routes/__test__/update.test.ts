import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../natsWrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({
      title: "testtest",
      price: 29,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "testtest",
      price: 29,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", global.signin())
    .send({
      title: "testtest",
      price: 29,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({
      title: "updated surely",
      price: 1000,
    })
    .expect(401);
});

it("returns a 400 if the user does not provide correct title or price while updating", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "testtest",
      price: 29,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 32 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "dsadas", price: -11 })
    .expect(400);
});

it("returns a 200 if update is succesfull with good creds", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets`)
    .set("Cookie", cookie)
    .send({
      title: "testtest",
      price: 29,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "finnaly a good updated ticket", price: 11 })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("finnaly a good updated ticket");
  expect(ticketResponse.body.price).toEqual(11);
});

it("publishes an event", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "asldkfj",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "new title",
      price: 100,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
