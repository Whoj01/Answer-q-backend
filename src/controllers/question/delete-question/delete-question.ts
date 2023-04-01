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
  DeleteQuestionParams,
  IDeleteQuestionRepository,
  KeysOfDeleteQuestionParams,
} from "./protocols";

export class DeleteQuestionController implements IController {
  constructor(
    private readonly deleteQuestionRepository: IDeleteQuestionRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<DeleteQuestionParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<DeleteQuestionParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfDeleteQuestionParams,
        body
      );

      if (requiredFields) return requiredFields;

      const questionDelete: boolean =
        await this.deleteQuestionRepository.deleteQuestion(body);

      return questionDelete
        ? successesRequest("Question deleted successfully", 200)
        : tryAgainLater(
            "its was not possible to delete the question. Try again later!",
            406
          );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
