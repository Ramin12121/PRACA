import { ApiResponse } from "./api";

export type EventResponse = ApiResponse<Event>;
export type EventListResponse = ApiResponse<Event[]>;

export type Event = {
  id: number;
  name: string;
  location: string;
  duration: string;
  price: string;
  coment: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
