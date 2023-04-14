import { prismaDB } from "../../../../../prisma/db/prisma";
import {
  ChangePassParams,
  IChangePassRepository,
} from "../../../../controllers/user/forgot-password/change-pass/protocols";
import { verifyToken } from "../../../../utils/jwt";

export class PrismaChangePassRepository implements IChangePassRepository {
  async changePass(params: ChangePassParams): Promise<boolean> {
    const findUser = await prismaDB.user.findUnique({
      where: {
        email: params.email,
      },
      select: {
        token_pass: true,
      },
    });

    if (!findUser) return false;

    if (!verifyToken(params.remember_pass)) return false;

    if (findUser.token_pass !== params.remember_pass) return false;

    await prismaDB.user.update({
      where: {
        email: params.email,
      },
      data: {
        password: params.password,
      },
    });

    return true;
  }
}
