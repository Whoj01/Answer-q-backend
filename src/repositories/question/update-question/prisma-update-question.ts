import { Question } from "@prisma/client";
import {
  IUpdateQuestionRepository,
  UpdateQuestionParams,
} from "../../../controllers/question/update-question/protocols";
import { prismaDB } from "../../../../prisma/db/prisma";

export class PrismaUpdateQuestionRepository
  implements IUpdateQuestionRepository
{
  async updateQuestion(params: UpdateQuestionParams): Promise<Question> {
    const find = await prismaDB.question.findUnique({
      where: {
        id: Number(params.user_id),
      },
      select: {
        user_question_id: true,
      },
    });

    if (find.user_question_id !== Number(params.user_id)) return;

    const question = prismaDB.question.update({
      where: {
        id: Number(params.question_id),
      },
      data: {
        content_question: params.content_question,
      },
    });

    return question;
  }
}
