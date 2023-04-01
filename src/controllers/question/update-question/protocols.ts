import { Question } from "@prisma/client";

class params {
  constructor(
    private readonly user_id?: number,
    private readonly question_id?: number
  ) {}
}

export const KeysOfUpdateQuestionParams = Object.keys(new params());

export interface UpdateQuestionParams {
  user_id: number;
  question_id: number;
  content_question: string;
}

export interface IUpdateQuestionRepository {
  updateQuestion(params: UpdateQuestionParams): Promise<Question>;
}
