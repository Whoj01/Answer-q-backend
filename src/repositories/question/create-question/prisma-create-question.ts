import { prismaDB } from "../../../../prisma/db/prisma";
import {
  CreateQuestionParams,
  ICreateQuestionRepository,
} from "../../../controllers/question/create-question/protocols";
import { Question } from "../../../models/Question";

export default class PrismaCreateQuestionRepository
  implements ICreateQuestionRepository
{
  async createQuestion(params: CreateQuestionParams): Promise<Question> {
    const question = await prismaDB.question.create({
      data: {
        content_question: params.content_question,
        room_id: Number(params.room_id),
        user_question_id: Number(params.user_id),
      },
    });

    return question;
  }
}
