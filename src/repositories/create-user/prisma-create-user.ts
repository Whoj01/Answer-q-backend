import {
  CreateUserParams,
  ICreateUserRepository,
} from "../../controllers/create-user/protocols";
import { User } from "../../models/User";
import { prismaDB } from "../../../prisma/db/prisma";
import { generateHash } from "../../utils/generate-remember-token";

export class PrismaCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<User> {
    const createdUser = await prismaDB.user.create({
      data: {
        nickname: params.nickname,
        email: params.email,
        password: params.password,
        token_pass: generateHash(params.nickname),
      },
    });

    delete createdUser.password;

    return createdUser;
  }
}
