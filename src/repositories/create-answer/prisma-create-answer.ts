import { Answer } from "@prisma/client";
import {
  CreateAnswerParams,
  ICreateAnswerRepository,
} from "../../controllers/create-answer/protocols";
import { prismaDB } from "../../../prisma/db/prisma";

export class PrismaCreateAnswerRepository implements ICreateAnswerRepository {
  async createAnswer(params: CreateAnswerParams): Promise<Answer> {
    const answer = await prismaDB.answer.create({
      data: {
        question_id: Number(params.question_id),
        content_answer: params.content_answer,
        user_answer_id: Number(params.user_answer_id),
      },
    });

    return answer;
  }
}
