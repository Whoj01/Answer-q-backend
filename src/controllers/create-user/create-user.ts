import { User } from "../../models/User";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpResquest: HttpResquest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      //verificar campos obrigatorios
      const requiredFields = ["nickname", "email", "password"];

      for (const field of requiredFields) {
        if (!httpResquest?.body?.[field as keyof CreateUserParams].length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      const { body } = httpResquest;

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
