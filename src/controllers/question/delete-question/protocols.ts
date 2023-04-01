class params {
  constructor(
    private readonly user_id?: number,
    private readonly question_id?: number
  ) {}
}

export const KeysOfDeleteQuestionParams = Object.keys(new params());

export interface DeleteQuestionParams {
  user_id: number;
  question_id: number;
}

export interface IDeleteQuestionRepository {
  deleteQuestion(params: DeleteQuestionParams): Promise<boolean>;
}
