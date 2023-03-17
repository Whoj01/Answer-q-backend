import { sign } from "crypto";
import { User } from "../../models/User";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  ILoginUserController,
  ILoginUserRepository,
  loginUserParams,
} from "./protocols";
import { signToken } from "../../utils/jwt";

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

      if (!user) {
        return {
          statusCode: 404,
          body: {
            msg: "Incorrect username or password",
            status: 404,
            acepted: false,
          },
        };
      }

      const token = signToken(user);

      return {
        statusCode: 202,
        body: token,
      };
    } catch (err: any) {
      return {
        statusCode: 500,
        body: err.message,
      };
    }
  }
}
