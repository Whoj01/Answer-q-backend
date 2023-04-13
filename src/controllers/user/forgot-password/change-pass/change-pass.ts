import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../../utils/responses";
import { verifyRequiredFields } from "../../../../utils/verify-required-fields";
import {
  HttpResponse,
  HttpResquest,
  IController,
  paramsBody,
  requiredFieldsError,
} from "../../../protocols";
import {
  ChangePassParams,
  IChangePassRepository,
  KeysOfChangePass,
} from "./protocols";

export class ChangePassController implements IController {
  constructor(
    private readonly prismaChangePassRepository: IChangePassRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<ChangePassParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<ChangePassParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfChangePass,
        body
      );

      if (requiredFields) return requiredFields;

      const userChangedPass: boolean =
        await this.prismaChangePassRepository.changePass(body);

      return userChangedPass
        ? successesRequest("Password changed successfully", 200)
        : tryAgainLater(
            "its was not possible to change the password now. Try again later!",
            403
          );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
