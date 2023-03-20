import { verifyRequiredFields } from "../../utils/verify-required-fields";
import { HttpResponse, HttpResquest } from "../protocols";
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
  ): Promise<HttpResponse<string | unknown>> {
    try {
      const { body } = httpResquest;

      const requiredFields = verifyRequiredFields(
        keysOfCreateQuestionParams,
        body
      );

      if (requiredFields) return requiredFields;

      const question = await this.createQuestionRepository.createQuestion(body);

      if (!question) {
        return {
          statusCode: 503,
          body: {
            msg: "Is not possible to create a question, try again later",
            ok: false,
            status: 503,
          },
        };
      }

      return {
        statusCode: 201,
        body: {
          msg: "Question created Successfully",
          ok: true,
          status: 201,
        },
      };
    } catch (error: any) {
      return {
        statusCode: 201,
        body: error.message,
      };
    }
  }
}
