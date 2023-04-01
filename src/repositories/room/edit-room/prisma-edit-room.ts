import { prismaDB } from "../../../../prisma/db/prisma";
import { creatorOfRoom } from "../../../controllers/protocols";
import {
  EditRoomParams,
  IEditRoomReporitory,
} from "../../../controllers/room/edit-room/protocols";

export class PrismaEditRoomRepository implements IEditRoomReporitory {
  async editRoom(params: EditRoomParams): Promise<boolean> {
    const userCreatorOfRoom: creatorOfRoom = await prismaDB.room.findUnique({
      where: {
        id: Number(params.room_id),
      },
      select: {
        user_creator_id: true,
      },
    });

    if (userCreatorOfRoom.user_creator_id !== params.user_id) return false;

    await prismaDB.room.update({
      where: {
        id: Number(params.room_id),
      },
      data: {
        room_name: params.room_name,
      },
    });

    return true;
  }
}
