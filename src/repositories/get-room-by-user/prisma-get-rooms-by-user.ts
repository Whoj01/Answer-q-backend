import { prismaDB } from "../../../prisma/db/prisma";
import {
  GetRoomsUserParams,
  IGetRoomsByUserRepository,
} from "../../controllers/get-rooms-user/protocols";
import { Room } from "../../models/Room";

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
        user: {
          select: {
            nickname: true,
          },
        },
        _count: {
          select: {
            participants: true,
            questions: true,
          },
        },
      },
    });

    return rooms;
  }
}
