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
  IGetIsAllowedRepository,
  KeysOfGetIsAllowed,
  getIsAllowedParams,
} from "./protocols";

export class GetIsAllowedController implements IController {
  constructor(
    private readonly getIsAllowedRepository: IGetIsAllowedRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<getIsAllowedParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<getIsAllowedParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfGetIsAllowed,
        body
      );

      if (requiredFields) return requiredFields;

      const allowed: boolean = await this.getIsAllowedRepository.getIsAllowed(
        body
      );

      return allowed
        ? successesRequest("User is allowed in room", 200)
        : tryAgainLater("User is not allowed in room", 401);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
