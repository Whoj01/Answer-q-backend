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
  IChangeIsAllowedRepository,
  KeysOfChangeIsAllowed,
  changeIsAllowedParams,
} from "./protocols";

export class ChangeIsAllowedController implements IController {
  constructor(
    private readonly changeIsAllowedRepository: IChangeIsAllowedRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<changeIsAllowedParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<changeIsAllowedParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfChangeIsAllowed,
        body
      );

      console.log(body);

      if (requiredFields) return requiredFields;

      const changeIsAllowed: boolean =
        await this.changeIsAllowedRepository.changeIsAllowed(body);

      const message: string =
        body.allowed === "1"
          ? "be allowed to enter the room"
          : "be not allowed to enter the room";

      return changeIsAllowed
        ? successesRequest(`User updated to ${message}`, 200)
        : tryAgainLater(
            "Its was not possible to change if the user is allowed. Please try again later!",
            503
          );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
