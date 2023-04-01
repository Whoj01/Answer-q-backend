import {
  errorRequest,
  successesRequest,
  tryAgainLater,
} from "../../../utils/responses";
import * as verifyRequiredFields from "../../../utils/verify-required-fields";
import {
  HttpResponse,
  HttpResquest,
  paramsBody,
  requiredFieldsError,
} from "../../protocols";
import {
  CreateQuestionParams,
  ICreateQuestionController,
  ICreateQuestionRepository,
  keysOfCreateQuestionParams,
} from "./protocols";

export class CreateQuestionController implements ICreateQuestionController {
  constructor(
    private readonly createQuestionRepository: ICreateQuestionRepository
  ) {}

  async handle(
    httpResquest: HttpResquest<CreateQuestionParams>
  ): Promise<HttpResponse<string>> {
    try {
      const { body }: paramsBody<CreateQuestionParams> = httpResquest;

      const requiredFields: requiredFieldsError =
        verifyRequiredFields.verifyRequiredFields(
          keysOfCreateQuestionParams,
          body
        );

      if (requiredFields) return requiredFields;

      const question = await this.createQuestionRepository.createQuestion(body);

      return question
        ? successesRequest("Question created successfully", 201, question)
        : tryAgainLater(
            "Is not possible to create a question, try again later",
            503
          );
    } catch (error: any) {
      return errorRequest(error.message, 500);
    }
  }
}
