import { Answer } from "../../../models/Answer";
import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import {
  HttpResquest,
  HttpResponse,
  paramsBody,
  requiredFieldsError,
} from "../../protocols";
import {
  CreateAnswerParams,
  ICreateAnswerController,
  ICreateAnswerRepository,
  keysOfCreateAnswerParams,
} from "./protocols";

export class CreateAnswerControler implements ICreateAnswerController {
  constructor(readonly createAnswerRepository: ICreateAnswerRepository) {}

  async handle(
    httpResquest: HttpResquest<CreateAnswerParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<CreateAnswerParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        keysOfCreateAnswerParams,
        body
      );

      if (requiredFields) return requiredFields;

      const answer: Answer | null =
        await this.createAnswerRepository.createAnswer(body);

      if (!answer)
        return tryAgainLater(
          "Is not possible to create a answer, try again later",
          503
        );

      return successesRequest("Answer created sucessfully", 201, answer);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
