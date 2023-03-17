import { Room } from "@prisma/client";
import { HttpResponse, HttpResquest } from "../protocols";

export interface ICreateRoomController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface CreateRoomParams {
  user_id: number;
  id: number;
}

export interface ICreateRoomRepository {
  createRoom(params: CreateRoomParams): Promise<Room>;
}
