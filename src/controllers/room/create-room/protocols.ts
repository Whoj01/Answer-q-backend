import { Room } from "@prisma/client";
import { HttpResponse, HttpResquest } from "../../protocols";

class params {
  constructor(
    readonly user_id?: string,
    readonly id?: string,
    readonly name?: string
  ) {}
}

export const keysOfRoomParams = Object.keys(new params());

export interface ICreateRoomController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface CreateRoomParams {
  user_id: number;
  id: number;
  name: string;
}

export interface ICreateRoomRepository {
  createRoom(params: CreateRoomParams): Promise<Room>;
}
