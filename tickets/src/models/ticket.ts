import mongoose from "mongoose";

interface TicketCreds {
  title: string;
  price: number;
  userId: string;
}
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(creds: TicketCreds): TicketDoc;
}
