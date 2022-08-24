import { Publisher, Subjects, TicketUpdatedEvent } from "@dticketin/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
