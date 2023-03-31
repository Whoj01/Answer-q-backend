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
import { errorRequest, successesRequest, tryAgainLater } from "../../utils/responses";
import { ok } from "assert";

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
        return tryAgainLater("Incorrect username or password", 404)
      }

      const token = signToken(user);

      return successesRequest("User loged successfully", 202, token)
        
    } catch (err: any) {
      return errorRequest(err.message, 500)
    }
  }
}
