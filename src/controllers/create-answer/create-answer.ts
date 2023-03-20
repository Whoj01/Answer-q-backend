import { verifyRequiredFields } from "../../utils/verify-required-fields";
import { HttpResquest, HttpResponse } from "../protocols";
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
        return {
          statusCode: 503,
          body: {
            msg: "Is not possible to create a answer, try again later",
            ok: false,
            status: 503,
          },
        };
      }

      return {
        statusCode: 201,
        body: {
          msg: "Answer created sucessfully",
          ok: true,
          status: 201,
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
