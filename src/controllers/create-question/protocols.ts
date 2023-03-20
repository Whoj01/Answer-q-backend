import { Question } from "../../models/Question";
import { HttpResponse, HttpResquest } from "../protocols";

class params {
  constructor(
    readonly room_id?: string,
    readonly user_question_id?: string,
    readonly content_question?: string
  ) {}
}

export const keysOfCreateQuestionParams = Object.keys(new params());

export interface ICreateQuestionController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface CreateQuestionParams {
  room_id: string;
  user_question_id: string;
  content_question: string;
}

export interface ICreateQuestionRepository {
  createQuestion(params: CreateQuestionParams): Promise<Question>;
}
