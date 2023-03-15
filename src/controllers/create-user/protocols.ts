import { User } from "../../models/User";
import { HttpResponse, HttpResquest } from "../protocols";

export interface ICreateUserController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface CreateUserParams {
  email: string;
  nickname: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}
