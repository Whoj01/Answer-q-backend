import { prismaDB } from "../../../../prisma/db/prisma";
import {
  IChangeIsAllowedRepository,
  changeIsAllowedParams,
} from "../../../controllers/participants/change-is-allowed/protocols";

export class PrismaChangeIsAllowedRepository
  implements IChangeIsAllowedRepository
{
  async changeIsAllowed(params: changeIsAllowedParams): Promise<boolean> {
    const userParticipant = await prismaDB.participants.findFirst({
      where: {
        room_id: Number(params.room_id),
        user_id: params.user_id,
      },
    });

    if (!userParticipant) return false;

    await prismaDB.participants.update({
      where: {
        id: userParticipant.id,
      },

      data: {
        allowed: params.allowed === "1" ? true : false,
      },
    });

    return true;
  }
}
