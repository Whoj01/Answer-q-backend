import { prismaDB } from "../../../../prisma/db/prisma";
import {
  DeleteRoomParams,
  IDeleteRoomRepository,
} from "../../../controllers/room/delete-room/protocols";
import { Room } from "../../../models/Room";

export class PrismaDeleteRoomRepository implements IDeleteRoomRepository {
  async deleteRoom(params: DeleteRoomParams): Promise<boolean> {
    const userCreatorOfRoom: Pick<Room, "user_creator_id"> =
      await prismaDB.room.findUnique({
        where: {
          id: Number(params.room_id),
        },
        select: {
          user_creator_id: true,
        },
      });

    if (userCreatorOfRoom.user_creator_id === params.user_id) {
      await prismaDB.room.delete({
        where: {
          id: Number(params.room_id),
        },
      });

      return true;
    }

    return false;
  }
}
