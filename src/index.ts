import express from "express";
import { PrismaCreateUserRepository } from "./repositories/create-user/prisma-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { config } from "dotenv";
import { prismaDB } from "../prisma/db/prisma";
import { PrismaLoginUserRepository } from "./repositories/login-user/prisma-login-user";
import { LoginUserController } from "./controllers/login-user/login-user";
import { authMiddleware } from "./middleware/Auth";
import { PrismaCreateRoomRepository } from "./repositories/create-room/prisma-create-room";
import { CreateRoomController } from "./controllers/create-room/create-room";
import { PrismaGetRoomsByUserRepository } from "./repositories/get-room-by-user/prisma-get-rooms-by-user";
import { GetRoomsByUserController } from "./controllers/get-rooms-user/get-rooms-user";
import { generateHash } from "./utils/generate-remember-token";
import PrismaCreateQuestionRepository from "./repositories/create-question/prisma-create-question";
import { CreateQuestionController } from "./controllers/create-question/create-question";
import { PrismaCreateAnswerRepository } from "./repositories/create-answer/prisma-create-answer";
import { CreateAnswerControler } from "./controllers/create-answer/create-answer";

async function main() {
  config();

  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 8000;

  app.post("/login", async (req, res) => {
    const prismaLoginUserRepository = new PrismaLoginUserRepository();

    const loginUserController = new LoginUserController(
      prismaLoginUserRepository
    );

    const { statusCode, body } = await loginUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.post("/users", async (req, res) => {
    const prismaCreateUserRepository = new PrismaCreateUserRepository();

    const createUserController = new CreateUserController(
      prismaCreateUserRepository
    );

    const { statusCode, body } = await createUserController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.use(authMiddleware);

  app.post("/rooms", async (req, res) => {
    const prismaCreateRoomRepository = new PrismaCreateRoomRepository();

    const createRoomController = new CreateRoomController(
      prismaCreateRoomRepository
    );

    const { statusCode, body } = await createRoomController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.get("/rooms/:user_id", async (req, res) => {
    const prismaGetRoomsByUserRepository = new PrismaGetRoomsByUserRepository();

    const getRoomsByUserController = new GetRoomsByUserController(
      prismaGetRoomsByUserRepository
    );

    const { statusCode, body } = await getRoomsByUserController.handle({
      params: {
        user_id: req.params.user_id,
      },
    });

    res.status(statusCode).send(body);
  });

  app.post("/question", async (req, res) => {
    const prismaCreateQuestionRepository = new PrismaCreateQuestionRepository();

    const createQuestionController = new CreateQuestionController(
      prismaCreateQuestionRepository
    );

    const { statusCode, body } = await createQuestionController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.post("/answer", async (req, res) => {
    console.log("entrou");
    const prismaCreateAnswerRepository = new PrismaCreateAnswerRepository();

    const createAnswerController = new CreateAnswerControler(
      prismaCreateAnswerRepository
    );

    const { statusCode, body } = await createAnswerController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prismaDB.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaDB.$disconnect();
    process.exit(1);
  });
