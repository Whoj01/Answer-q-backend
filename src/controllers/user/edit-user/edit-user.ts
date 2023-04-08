import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import {
  HttpResponse,
  HttpResquest,
  IController,
  paramsBody,
  requiredFieldsError,
} from "../../protocols";
import {
  EditUserParams,
  IEditUserRepository,
  KeysOfEditUserParams,
  returnOfEditUser,
} from "./protocols";

export class EditUserController implements IController {
  constructor(private readonly editUserRepository: IEditUserRepository) {}

  async handle(
    httpResquest: HttpResquest<EditUserParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<EditUserParams> = httpResquest;

      if (
        body.email !== undefined ||
        body.nickname !== undefined ||
        body.password !== undefined
      ) {
        const editUser: returnOfEditUser =
          await this.editUserRepository.editUser(body);

        return editUser.ok
          ? successesRequest("User edited successfully", 202)
          : tryAgainLater(editUser.msg, 401);
      }

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfEditUserParams,
        body
      );

      if (requiredFields) return requiredFields;
    } catch (error: any) {
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }
}
