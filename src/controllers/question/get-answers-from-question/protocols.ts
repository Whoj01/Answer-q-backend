import { Answer } from "../../../models/Answer"

class params {
  constructor(private readonly question_id?: number) {}
}

export const KeysOfGetAnswerFromRoom = Object.keys(new params())

export interface GetAnswersFromQuestionParams {
  question_id: number
}

export type AnswerFromQuestion = Pick<Answer, "content_answer" | "user">

export interface IGetAnswersFromQuestionRepository {
  getAnswers(params: GetAnswersFromQuestionParams) : Promise<AnswerFromQuestion[]>
}