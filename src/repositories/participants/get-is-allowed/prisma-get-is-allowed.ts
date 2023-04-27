import { prismaDB } from "../../../../prisma/db/prisma";
import {
  IGetIsAllowedRepository,
  getIsAllowedParams,
} from "../../../controllers/participants/get-is-allowed/protocols";

export class PrismaGetIsAllowedRepository implements IGetIsAllowedRepository {
  async getIsAllowed(params: getIsAllowedParams): Promise<boolean> {
    const userIsAllowed = await prismaDB.participants.findFirst({
      where: {
        room_id: Number(params.room_id),
        user_id: params.user_id,
      },
      select: {
        allowed: true,
      },
    });

    if (!userIsAllowed) return false;

    return userIsAllowed.allowed;
  }
}
