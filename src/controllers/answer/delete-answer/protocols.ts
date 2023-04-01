import { HttpResponse, HttpResquest } from "../../protocols";

class params {
  constructor(readonly user_id?: number) {}
}

export const keysOfDeleteAnswer = Object.keys(new params());

export interface IDeleteAnswerController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface DeleteAnswerParams {
  user_id: number;
  id: number;
}

export interface IDeleteAnswerRepository {
  deleteAnswer(params: DeleteAnswerParams): Promise<boolean>;
}
