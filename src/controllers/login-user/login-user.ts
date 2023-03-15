import { User } from "../../models/User";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  ILoginUserController,
  ILoginUserRepository,
  loginUserParams,
} from "./protocols";

export class LoginUserController implements ILoginUserController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(
    httpResquest: HttpResquest<User>
  ): Promise<HttpResponse<unknown>> {
    try {
      const requiredFilds = ["email", "password"];

      for (const field of requiredFilds) {
        if (!httpResquest?.body?.[field as keyof loginUserParams].length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }
      const { body } = httpResquest;

      const user = await this.loginUserRepository.findUser(body!);

      return {
        statusCode: 202,
        body: "ola",
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        body: err.message,
      };
    }
  }
}
