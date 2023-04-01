import { sign, verify } from "crypto";
import { User } from "../../models/User";
import {
  HttpResquest,
  HttpResponse,
  paramsBody,
  requiredFieldsError,
} from "../protocols";
import {
  ILoginUserController,
  ILoginUserRepository,
  keysOfLoginUser,
  loginUserParams,
} from "./protocols";
import { signToken } from "../../utils/jwt";
import { verifyRequiredFields } from "../../utils/verify-required-fields";
import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../utils/responses";
import { ok } from "assert";

export class LoginUserController implements ILoginUserController {
  constructor(private readonly loginUserRepository: ILoginUserRepository) {}

  async handle(
    httpResquest: HttpResquest<User>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<User> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        keysOfLoginUser,
        body
      );

      if (requiredFields) return requiredFields;

      const user: User = await this.loginUserRepository.findUser(body);

      if (!user) {
        return tryAgainLater("Incorrect username or password", 404);
      }

      const token: string = signToken(user);

      return successesRequest("User loged successfully", 202, token);
    } catch (err: any) {
      return errorRequest(err.message, 500);
    }
  }
}
