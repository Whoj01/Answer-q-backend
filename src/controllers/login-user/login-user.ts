import { sign, verify } from "crypto";
import { User } from "../../models/User";
import { HttpResquest, HttpResponse } from "../protocols";
import {
  ILoginUserController,
  ILoginUserRepository,
  keysOfLoginUser,
  loginUserParams,
} from "./protocols";
import { signToken } from "../../utils/jwt";
import { verifyRequiredFields } from "../../utils/verify-required-fields";

export class LoginUserController implements ILoginUserController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(
    httpResquest: HttpResquest<User>
  ): Promise<HttpResponse<unknown>> {
    try {
      const { body } = httpResquest;

      const requiredFields = verifyRequiredFields(keysOfLoginUser, body);

      if (requiredFields) return requiredFields;

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
