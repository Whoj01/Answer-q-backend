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
  IUpdateAnswerController,
  IUpdateAnswerRepository,
  UpdateAnswerParams,
  keysOfUpdateAnswer,
} from "./protocols";

export class UpdateAnswerController implements IUpdateAnswerController {
  constructor(
    private readonly updateAnswerRepository: IUpdateAnswerRepository
  ) {}

  async handle(
    HttpResquest: HttpResquest<UpdateAnswerParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<UpdateAnswerParams> = HttpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        keysOfUpdateAnswer,
        body
      );

      if (requiredFields) return requiredFields;

      const updatedAnswer: Answer =
        await this.updateAnswerRepository.updateAnswer(body);

      if (!updatedAnswer)
        return tryAgainLater(
          "Its was not possible to create a answer, try again later",
          503
        );

      return successesRequest("Answer updated sucessfully", 202);
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
