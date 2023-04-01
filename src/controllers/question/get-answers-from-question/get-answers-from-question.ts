import { PrismGetAnswersFromQuestion } from "../../../repositories/question/get-answers-from-question/prisma-get-answers-from-question";
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
  params,
  requiredFieldsError,
} from "../../protocols";
import {
  AnswerFromQuestion,
  GetAnswersFromQuestionParams,
  IGetAnswersFromQuestionRepository,
  KeysOfGetAnswerFromRoom,
} from "./protocols";

export class GetAnswersFromQuestionController implements IController {
  constructor(
    private readonly getAnswersFromQuestionRepository: IGetAnswersFromQuestionRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<GetAnswersFromQuestionParams>
  ): Promise<HttpResponse<AnswerFromQuestion | string>> {
    try {
      const { params }: params<GetAnswersFromQuestionParams> = httpResquest;

      const requiredFields: requiredFieldsError = verifyRequiredFields(
        KeysOfGetAnswerFromRoom,
        params
      );

      if (requiredFields) return requiredFields;

      const answers = await this.getAnswersFromQuestionRepository.getAnswers(
        params
      );

      if (!answers) {
        return tryAgainLater(
          "Is not possible to get the answers now. Try again later!",
          503
        );
      }

      return successesRequest(
        "successfully recovered of the answers",
        200,
        answers
      );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
