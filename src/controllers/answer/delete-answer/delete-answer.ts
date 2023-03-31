import { verifyRequiredFields } from "../../../utils/verify-required-fields";
import { HttpResquest, HttpResponse } from "../../protocols";
import { DeleteAnswerParams, IDeleteAnswerController, IDeleteAnswerRepository, keysOfDeleteAnswer } from "./protocols";


export class DeleteAnswerController implements IDeleteAnswerController {

  constructor(private readonly deleteAnswerRepository: IDeleteAnswerRepository) {}

  async handle(httpResquest: HttpResquest<DeleteAnswerParams>): Promise<HttpResponse<string | unknown>> {
    try {
      const { body } = httpResquest

      const requiredFields = verifyRequiredFields(keysOfDeleteAnswer, body)

      if(requiredFields) return requiredFields

      const deleteAnswer = await this.deleteAnswerRepository.deleteAnswer(body)

      if(!deleteAnswer) {
        return {
          statusCode: 503,
          body: {
            msg: "Is not possible to delete the answer, try again later",
            ok: false,
            status: 503,
          }         
       }
      }

      return {
        statusCode: 202,
        body: {
          msg: "Answer deleted successfully",
          ok: true,
          status: 202,
        }         
     }

    } catch (error: any) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  }

}