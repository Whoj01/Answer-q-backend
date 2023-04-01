import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../utils/responses";
import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResponse, HttpResquest, IController } from "../../protocols";
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
      const {
        body,
      }: Pick<HttpResquest<DeleteQuestionParams>, "body"> = httpResquest;

      const requiredFields: HttpResponse<string> | null = verifyRequiredFields(
        KeysOfDeleteQuestionParams,
        body
      );

      if (requiredFields) return requiredFields;

      const questionDelete: boolean =
        await this.deleteQuestionRepository.deleteQuestion(body);

      return questionDelete
        ? successesRequest("Question deleted successfully", 200)
        : tryAgainLater(
            "is was not possible to delete the question. Try again later!",
            406
          );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
