import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResquest, HttpResponse } from "../../protocols";
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
  ): Promise<HttpResponse<string | unknown>> {
    try {
      const { body } = httpResquest;

      const requiredFields = verifyRequiredFields(
        keysOfCreateAnswerParams,
        body
      );

      if (requiredFields) return requiredFields;

      const answer = await this.createAnswerRepository.createAnswer(body);

      if (!answer) {
        return tryAgainLater(
          "Is not possible to create a answer, try again later",
          503
        );
      }

      return successesRequest("Answer created sucessfully", 201, answer);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
