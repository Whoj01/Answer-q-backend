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
  DeleteAnswerParams,
  IDeleteAnswerController,
  IDeleteAnswerRepository,
  keysOfDeleteAnswer,
} from "./protocols";

export class DeleteAnswerController implements IDeleteAnswerController {
  constructor(
    private readonly deleteAnswerRepository: IDeleteAnswerRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<DeleteAnswerParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<DeleteAnswerParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        keysOfDeleteAnswer,
        body
      );

      if (requiredFields) return requiredFields;

      const deleteAnswer: boolean =
        await this.deleteAnswerRepository.deleteAnswer(body);

      if (!deleteAnswer)
        return tryAgainLater(
          "Its not possible to delete the answer, try again later",
          503
        );

      return successesRequest("Answer deleted successfully", 200);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
