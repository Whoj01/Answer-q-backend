import {
  GetRoomsUserParams,
  IGetRoomsByUserRepository,
} from "../../controllers/get-rooms-user/protocols";
import { Room } from "../../models/Room";

export class PrismaGetRoomsByUserRepository
  implements IGetRoomsByUserRepository
{
  getRooms(params: GetRoomsUserParams): Promise<Room[]> {
    throw new Error("Method not implemented.");
  }
}
