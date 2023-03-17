import { Room } from "@prisma/client";
import {
  CreateRoomParams,
  ICreateRoomRepository,
} from "../../controllers/create-room/protocols";
import prismaDB from "../../../prisma/db/prisma";

export class PrismaCreateRoomRepository implements ICreateRoomRepository {
  async createRoom(params: CreateRoomParams): Promise<Room> {
    const room = await prismaDB.room.create({
      data: {
        id: Number(params.id),
        user_creator_id: Number(params.user_id),
      },
    });

    return room;
  }
}
