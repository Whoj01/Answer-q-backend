import { prismaDB } from "../../../../prisma/db/prisma";
import {
  EditUserParams,
  IEditUserRepository,
  returnOfEditUser,
} from "../../../controllers/user/edit-user/protocols";
import { User } from "../../../models/User";
import { generateHash } from "../../../utils/generate-remember-token";

export class PrismaEditUserRepository implements IEditUserRepository {
  async editUser(params: EditUserParams): Promise<returnOfEditUser> {
    const userUpdate = await prismaDB.user.findFirst({
      where: {
        id: params.user_id,
      },
      select: {
        nickname: true,
        email: true,
        token_pass: true,
        password: true,
      },
    });

    if (params.email?.length > 0) {
      const emailIsUsed: Pick<User, "email"> = await prismaDB.user.findFirst({
        where: {
          email: params.email,
        },
        select: {
          email: true,
        },
      });

      if (emailIsUsed !== null && emailIsUsed.email === params.email)
        return {
          msg: "Email is already in use",
          ok: false,
        };
    }

    if (params.nickname?.length > 0) {
      const nicknameIsUsed = await prismaDB.user.findFirst({
        where: {
          nickname: params.nickname,
        },
        select: {
          nickname: true,
        },
      });

      if (
        nicknameIsUsed !== null &&
        nicknameIsUsed.nickname === params.nickname
      )
        return {
          msg: "Nickname is already in use",
          ok: false,
        };
    }

    await prismaDB.user.update({
      where: {
        id: params.user_id,
      },
      data: {
        email: params.email?.length > 0 ? params.email : userUpdate.email,
        nickname:
          params.nickname?.length > 0 ? params.nickname : userUpdate.nickname,
        token_pass:
          params.nickname?.length > 0
            ? generateHash(params.nickname)
            : userUpdate.token_pass,
        password:
          params.password?.length > 0 ? params.password : userUpdate.password,
      },
    });

    return {
      msg: "User updated successfully",
      ok: true,
    };
  }
}
