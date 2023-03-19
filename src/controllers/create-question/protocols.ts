import { Question } from "../../models/Question";
import { HttpResquest } from "../protocols";

export interface ICreateQuestionController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResquest<unknown>>;
}

export interface CreateQuestionParams {
  room_id: string;
  user_question_id: string;
  content_question: string;
}

export interface ICreateQuestionRepository {
  createQuestion(params: CreateQuestionParams): Promise<Question>;
}
