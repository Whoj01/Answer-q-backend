import { Room } from "../../models/Room";
import { HttpResponse, HttpResquest } from "../protocols";

export interface IGetRoomsByUserController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface GetRoomsUserParams {
  user_id: number;
}

export interface IGetRoomsByUserRepository {
  getRooms(params: GetRoomsUserParams): Promise<Room[]>;
}
