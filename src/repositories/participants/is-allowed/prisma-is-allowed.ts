import { prismaDB } from "../../../../prisma/db/prisma";
import {
  setIsAllowedParams,
  ISetIsAllowedRepository,
} from "../../../controllers/participants/is-allowed/protocols";
import { Room } from "../../../models/Room";

export class PrismaSetIsAllowedRepository implements ISetIsAllowedRepository {
  async isAllowed(params: setIsAllowedParams): Promise<string> {
    const userIsInRoom = await prismaDB.participants.findFirst({
      where: {
        room_id: Number(params.room_id),
        user_id: params.user_id,
      },
    });

    if (userIsInRoom) return "inRoom";

    if (!params?.password) {
      const room: Pick<Room, "private"> = await prismaDB.room.findUnique({
        where: {
          id: Number(params.room_id),
        },
        select: {
          private: true,
        },
      });

      if (!room) return "notFound";

      // If room is private and password was not send by request
      if (room.private) return "enterPass";

      await prismaDB.participants.create({
        data: {
          allowed: true,
          room_id: Number(params.room_id),
          user_id: params.user_id,
        },
      });

      return "allowed";
    }

    const roomPass: Pick<Room, "password" | "private"> =
      await prismaDB.room.findUnique({
        where: {
          id: Number(params.room_id),
        },
        select: {
          password: true,
          private: true,
        },
      });

    if (!roomPass) return "notFound";

    if (!roomPass.private) return "publicRoom";

    if (roomPass.password === params.password) {
      await prismaDB.participants.create({
        data: {
          allowed: true,
          room_id: Number(params.room_id),
          user_id: params.user_id,
        },
      });

      return "allowed";
    }

    return "passIncorrect";
  }
}
