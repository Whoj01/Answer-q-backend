import { User } from "../../models/User";
import { HttpResquest, HttpResponse } from "../protocols";

class params {
  constructor(readonly email?: string, readonly password?: string) {}
}

export const keysOfLoginUser = Object.keys(new params());

export interface ILoginUserController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface loginUserParams {
  nickname?: string;
  email?: string;
  password?: string;
}

export interface ILoginUserRepository {
  findUser(user: loginUserParams): Promise<User>;
}
