import { prismaDB } from "../../../../prisma/db/prisma";
import {
  GetAnswersFromQuestionParams,
  IGetAnswersFromQuestionRepository,
  AnswerFromQuestion,
} from "../../../controllers/question/get-answers-from-question/protocols";
import { Answer } from "../../../models/Answer";

export class PrismGetAnswersFromQuestion
  implements IGetAnswersFromQuestionRepository
{
  async getAnswers(
    params: GetAnswersFromQuestionParams
  ): Promise<AnswerFromQuestion[] | any> {
    const answers = await prismaDB.question.findMany({
      where: {
        id: Number(params.question_id),
      },
      select: {
        answer: {
          select: {
            content_answer: true,
            user: {
              select: {
                nickname: true,
              },
            },
          },
        },
      },
    });

    return answers;
  }
}
