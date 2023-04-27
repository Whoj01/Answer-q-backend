import { Answer } from "../../../models/Answer";
import { HttpResponse, HttpResquest } from "../../protocols";

class params {
  constructor(
    readonly content_answer?: string,
    readonly answer_id?: string,
    readonly user_id?: string
  ) {}
}

export const keysOfUpdateAnswer = Object.keys(new params());

export interface IUpdateAnswerController {
  handle(HttpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface UpdateAnswerParams {
  content_answer: string;
  answer_id: string;
  user_id: string;
}

export interface IUpdateAnswerRepository {
  updateAnswer(params: UpdateAnswerParams): Promise<Answer>;
}
