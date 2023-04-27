import { prismaDB } from "../../../../prisma/db/prisma";
import {
  GetRoomsUserParams,
  IGetRoomsByUserRepository,
} from "../../../controllers/room/get-rooms-user/protocols";
import { Room } from "../../../models/Room";

export class PrismaGetRoomsByUserRepository
  implements IGetRoomsByUserRepository
{
  async getRooms(params: GetRoomsUserParams): Promise<Room[]> {
    const rooms = await prismaDB.room.findMany({
      where: {
        user_creator_id: params.user_id,
      },
      select: {
        id: true,
        room_name: true,
        CreatedDate: true,
        User: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            Participants: true,
            Questions: true,
          },
        },
      },
    });

    return rooms;
  }
}
