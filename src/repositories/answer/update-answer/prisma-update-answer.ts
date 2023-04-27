import { prismaDB } from "../../../../prisma/db/prisma";
import {
  IUpdateAnswerRepository,
  UpdateAnswerParams,
} from "../../../controllers/answer/update-answer/protocols";
import { Answer } from "../../../models/Answer";

export class PrismaUpdateAnswerRepository implements IUpdateAnswerRepository {
  async updateAnswer(params: UpdateAnswerParams): Promise<Answer> {
    const find = await prismaDB.answer.findUnique({
      where: {
        id: Number(params.answer_id),
      },
    });

    if (find.user_answer_id !== Number(params.user_id)) return;

    const updatedAnswer = await prismaDB.answer.update({
      where: {
        id: Number(params.answer_id),
      },
      select: {
        content_answer: true,
        user_answer_id: true,
        id: true,
        question_id: true,
      },
      data: {
        content_answer: params.content_answer,
      },
    });

    return updatedAnswer;
  }
}
