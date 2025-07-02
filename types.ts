import { Card, List, Message } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };

export type CardWithList = Card & { list: List } & { messages: Message[] } & {
  file: File[];
};
