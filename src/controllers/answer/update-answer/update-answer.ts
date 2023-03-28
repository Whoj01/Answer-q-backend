import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResquest, HttpResponse } from "../../protocols";
import { IUpdateAnswerController, IUpdateAnswerRepository, UpdateAnswerParams, keysOfUpdateAnswer } from "./protocols";

export class UpdateAnswerController implements IUpdateAnswerController {
  constructor(private readonly updateAnswerRepository: IUpdateAnswerRepository){}


  async handle(HttpResquest: HttpResquest<UpdateAnswerParams>): Promise<HttpResponse<string | unknown>> {
    try {
      const { body } = HttpResquest

      const requiredFields = verifyRequiredFields(keysOfUpdateAnswer, body)

      if(requiredFields) return requiredFields

      const updatedAnswer = await this.updateAnswerRepository.updateAnswer(body)

      if(!updatedAnswer) {
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
          msg: "Answer updated sucessfully",
          ok: true,
          status: 201,
        },
      }

    } catch (error:any) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  }
}