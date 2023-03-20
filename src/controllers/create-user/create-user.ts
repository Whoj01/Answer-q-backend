import { User } from "../../models/User";
import { verifyRequiredFields } from "../../utils/verify-required-fields";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
  keysOfUserParams,
} from "./protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpResquest: HttpResquest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      //verificar campos obrigatorios

      const { body } = httpResquest;

      const requiredFields = verifyRequiredFields(keysOfUserParams, body);

      if (requiredFields) return requiredFields;

      const user = await this.createUserRepository.createUser(body!);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error: any) {
      if (error.meta.target[0] === "email") {
        return {
          statusCode: 406,
          body: "Email already exists",
        };
      }

      if (error.meta.target[0] === "nickname") {
        return {
          statusCode: 406,
          body: "Nickname already exists",
        };
      }

      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
