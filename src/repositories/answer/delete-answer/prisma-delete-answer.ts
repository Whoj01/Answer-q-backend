import { prismaDB } from "../../../../prisma/db/prisma";
import { DeleteAnswerParams, IDeleteAnswerRepository } from "../../../controllers/answer/delete-answer/protocols";


export class PrismaDeleteAnswerRepository implements IDeleteAnswerRepository{
  async deleteAnswer(params: DeleteAnswerParams): Promise<unknown> {
    const userIsCreatorOfRoom = await prismaDB.answer.findUnique({
      where: {
        id: Number(params.id)
      },
      select: {
        question: {
          select: {
            room: {
              select: {
                user_creator_id: true
              }
            }
          }
        }
      }
    })

    const userIsCreatorOfAnswer = await prismaDB.answer.findUnique({
      where: {
        id: Number(params.id)
      },
      select: {
        user_answer_id: true
      }
    })

    if (userIsCreatorOfAnswer.user_answer_id === Number(params.user_id) || userIsCreatorOfRoom.question.room.user_creator_id === Number(params.user_id)) {
      await prismaDB.answer.delete({
        where: {
          id: Number(params.id),
        }
      })
      return true
    }

    return false
  }

}