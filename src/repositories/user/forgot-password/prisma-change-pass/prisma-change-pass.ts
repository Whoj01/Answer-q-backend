import { prismaDB } from "../../../../../prisma/db/prisma";
import {
  ChangePassParams,
  IChangePassRepository,
} from "../../../../controllers/user/forgot-password/change-pass/protocols";

export class PrismaChangePassRepository implements IChangePassRepository {
  async changePass(params: ChangePassParams): Promise<boolean> {
    const findUser = await prismaDB.user.findUnique({
      where: {
        token_pass: params.remember_pass,
      },
    });

    if (!findUser) return false;

    await prismaDB.user.update({
      where: {
        token_pass: params.remember_pass,
      },
      data: {
        password: params.password,
      },
    });

    return true;
  }
}
