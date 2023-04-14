import { prismaDB } from "../../../../../prisma/db/prisma";
import {
  ISendRecoveryEmail,
  ReturnTokenPass,
  SendMailParams,
} from "../../../../controllers/user/forgot-password/send-email/protocols";

export class PrismaVerifyEmail implements ISendRecoveryEmail {
  async verifyEmail(
    params: SendMailParams
  ): Promise<ReturnTokenPass | boolean> {
    const findUser = await prismaDB.user.findUnique({
      where: {
        email: params.email,
      },
    });

    if (!findUser) return false;

    const updateUser = await prismaDB.user.update({
      where: {
        email: params.email,
      },
      data: {
        token_pass: params.token_pass,
      },
    });

    return updateUser;
  }
}
