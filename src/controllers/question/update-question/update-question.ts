import { Question } from "../../../models/Question";
import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";

import { HttpResponse, HttpResquest, IController } from "../../protocols";
import {
  IUpdateQuestionRepository,
  KeysOfUpdateQuestionParams,
  UpdateQuestionParams,
} from "./protocols";

export class UpdateQuestionController implements IController {
  constructor(
    private readonly updateQuestionsRepository: IUpdateQuestionRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<UpdateQuestionParams>
  ): Promise<HttpResponse<Question | string>> {
    try {
      const {
        body,
      }: Pick<HttpResquest<UpdateQuestionParams>, "body"> = httpResquest;

      const requiredFields: HttpResponse<string> = verifyRequiredFields(
        KeysOfUpdateQuestionParams,
        body
      );

      if (requiredFields) return requiredFields;

      const question: Question =
        await this.updateQuestionsRepository.updateQuestion(body);

      if (!question)
        return tryAgainLater(
          "Is was not possible to update the question. Try again later!",
          503
        );

      return successesRequest("Question updated successfully", 200, question);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
