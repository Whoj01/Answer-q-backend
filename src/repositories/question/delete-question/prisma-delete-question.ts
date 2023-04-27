import { prismaDB } from "../../../../prisma/db/prisma";
import {
  DeleteQuestionParams,
  IDeleteQuestionRepository,
} from "../../../controllers/question/delete-question/protocols";

export class PrismaDeleteQuestionRepository
  implements IDeleteQuestionRepository
{
  async deleteQuestion(params: DeleteQuestionParams): Promise<boolean> {
    const userCreatorOfRoom = await prismaDB.question.findUnique({
      where: {
        id: Number(params.question_id),
      },
      select: {
        Room: {
          select: {
            user_creator_id: true,
          },
        },
      },
    });

    const userCreatorOfQuestion = await prismaDB.question.findUnique({
      where: {
        id: Number(params.question_id),
      },
      select: {
        user_question_id: true,
      },
    });

    if (
      userCreatorOfRoom.Room.user_creator_id === Number(params.user_id) ||
      userCreatorOfQuestion.user_question_id === Number(params.user_id)
    ) {
      await prismaDB.question.delete({
        where: {
          id: Number(params.question_id),
        },
      });

      return true;
    }

    return false;
  }
}
