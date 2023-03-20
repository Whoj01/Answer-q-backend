import { User } from "../../models/User";
import { HttpResponse, HttpResquest } from "../protocols";

/*
 * This class returns the keys of the interface that contains the required fields used to create a user
 * return a already initialized empty variables
 */
class params {
  constructor(
    readonly email?: string,
    readonly nickname?: string,
    readonly password?: string
  ) {}
}

/*
 * Contains the array used to verify the fields to create a new user
 */
export const keysOfUserParams = Object.keys(new params());

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
