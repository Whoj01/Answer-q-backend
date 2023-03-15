import {
  ILoginUserRepository,
  loginUserParams,
} from "../../controllers/login-user/protocols";
import prismaDB from "../../../prisma/db/prisma";
import { User } from "../../models/User";

export class PrismaLoginUserRepository implements ILoginUserRepository {
  async findUser(user: loginUserParams): string {
    const findUser = await prismaDB.user.findFirst({
      where: {
        email: user.email,
        password: user.password,
      },
      select: {
        email: true,
        nickname: true,
        token_pass: true,
      },
    });

    console.log(findUser);

    return "oi";
  }
}
