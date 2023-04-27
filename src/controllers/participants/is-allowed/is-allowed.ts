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
} from "../../protocols";
import {
  ISetIsAllowedRepository,
  KeysOfSetIsAllowed,
  returnsRequests,
  setIsAllowedParams,
} from "./protocols";

export class SetIsAllowedController implements IController {
  constructor(
    private readonly setIsAllowedRepository: ISetIsAllowedRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<setIsAllowedParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<setIsAllowedParams> = httpResquest;

      const requiredFields = verifyRequiredFields(KeysOfSetIsAllowed, body);

      if (requiredFields) return requiredFields;

      const isAllowed: string = await this.setIsAllowedRepository.isAllowed(
        body
      );

      return returnsRequests[isAllowed];
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
