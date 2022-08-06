import { Publisher, Subjects, TicketCreatedEvent } from "@dticketin/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

// new TicketCreatedPublisher(client).publish(ticket)
