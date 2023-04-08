import { prismaDB } from "../../../../../prisma/db/prisma";
import {
  ISendRecoveryEmail,
  ReturnTokenPass,
  SendMailParams,
} from "../../../../controllers/user/forgot-password/send-email/protocols";

export class PrismaVerifyEmail implements ISendRecoveryEmail {
  async verifyEmail(params: SendMailParams): Promise<ReturnTokenPass> {
    const findUser = await prismaDB.user.findUnique({
      where: {
        email: params.email,
      },
      select: {
        token_pass: true,
      },
    });

    return findUser;
  }
}
