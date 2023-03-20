import { Answer } from "@prisma/client";
import { HttpResponse, HttpResquest } from "../protocols";

class params {
  constructor(
    readonly question_id?: string,
    readonly user_answer_id?: string,
    readonly content_answer?: string
  ) {}
}

export const keysOfCreateAnswerParams = Object.keys(new params());

export interface ICreateAnswerController {
  handle(httpResquest: HttpResquest<unknown>): Promise<HttpResponse<unknown>>;
}

export interface CreateAnswerParams {
  question_id: string;
  user_answer_id: string;
  content_answer: string;
}

export interface ICreateAnswerRepository {
  createAnswer(params: CreateAnswerParams): Promise<Answer>;
}
