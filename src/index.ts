import express from "express";
import { PrismaCreateUserRepository } from "./repositories/user/create-user/prisma-create-user";
import { CreateUserController } from "./controllers/user/create-user/create-user";
import { config } from "dotenv";
import { prismaDB } from "../prisma/db/prisma";
import { PrismaLoginUserRepository } from "./repositories/user/login-user/prisma-login-user";
import { LoginUserController } from "./controllers/user/login-user/login-user";
import { authMiddleware } from "./middleware/Auth";
import { PrismaCreateRoomRepository } from "./repositories/room/create-room/prisma-create-room";
import { CreateRoomController } from "./controllers/room/create-room/create-room";
import { PrismaGetRoomsByUserRepository } from "./repositories/room/get-room-by-user/prisma-get-rooms-by-user";
import { GetRoomsByUserController } from "./controllers/room/get-rooms-user/get-rooms-user";
import PrismaCreateQuestionRepository from "./repositories/question/create-question/prisma-create-question";
import { CreateQuestionController } from "./controllers/question/create-question/create-question";
import { PrismaCreateAnswerRepository } from "./repositories/answer/create-answer/prisma-create-answer";
import { CreateAnswerControler } from "./controllers/answer/create-answer/create-answer";
import { PrismaUpdateAnswerRepository } from "./repositories/answer/update-answer/prisma-update-answer";
import { UpdateAnswerController } from "./controllers/answer/update-answer/update-answer";
import { BodyWithToken } from "./utils/Body-with-token";
import { PrismaDeleteAnswerRepository } from "./repositories/answer/delete-answer/prisma-delete-answer";
import { DeleteAnswerController } from "./controllers/answer/delete-answer/delete-answer";
import { PrismGetAnswersFromQuestion } from "./repositories/question/get-answers-from-question/prisma-get-answers-from-question";
import { GetAnswersFromQuestionController } from "./controllers/question/get-answers-from-question/get-answers-from-question";
import { PrismaUpdateQuestionRepository } from "./repositories/question/update-question/prisma-update-question";
import { UpdateQuestionController } from "./controllers/question/update-question/update-question";
import { PrismaDeleteQuestionRepository } from "./repositories/question/delete-question/prisma-delete-question";
import { DeleteQuestionController } from "./controllers/question/delete-question/delete-question";
import { PrismaDeleteRoomRepository } from "./repositories/room/delete-room/prisma-delete-room";
import { DeleteRoomController } from "./controllers/room/delete-room/delete-room";
import { PrismaEditRoomRepository } from "./repositories/room/edit-room/prisma-edit-room";
import { EditRoomController } from "./controllers/room/edit-room/edit-room";
import { PrismaEditUserRepository } from "./repositories/user/edit-user/prisma-edit-user";
import { EditUserController } from "./controllers/user/edit-user/edit-user";
import { PrismaVerifyEmail } from "./repositories/user/forgot-password/prisma-verify-email/prisma-verify-email";
import { SendRecoveryEmailController } from "./controllers/user/forgot-password/send-email/forgot-password";
import { PrismaChangePassRepository } from "./repositories/user/forgot-password/prisma-change-pass/prisma-change-pass";
import { IChangePassRepository } from "./controllers/user/forgot-password/change-pass/protocols";
import { IController } from "./controllers/protocols";
import { ChangePassController } from "./controllers/user/forgot-password/change-pass/change-pass";
import { PrismaSetIsAllowedRepository } from "./repositories/participants/is-allowed/prisma-is-allowed";
import { SetIsAllowedController } from "./controllers/participants/is-allowed/is-allowed";
import { PrismaGetIsAllowedRepository } from "./repositories/participants/get-is-allowed/prisma-get-is-allowed";
import { GetIsAllowedController } from "./controllers/participants/get-is-allowed/get-is-allowed";
import { PrismaChangeIsAllowedRepository } from "./repositories/participants/change-is-allowed/prisma-change-is-allowed";
import { ChangeIsAllowedController } from "./controllers/participants/change-is-allowed/change-is-allowed";

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

  app.post("/forgot-password", async (req, res) => {
    const prismaSendEmail = new PrismaVerifyEmail();

    const sendRecoveryEmail = new SendRecoveryEmailController(prismaSendEmail);

    const { statusCode, body } = await sendRecoveryEmail.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.patch("/forgot-password", async (req, res) => {
    const prismaChangePassRepository: IChangePassRepository =
      new PrismaChangePassRepository();

    const changePassController: IController = new ChangePassController(
      prismaChangePassRepository
    );

    const { statusCode, body } = await changePassController.handle({
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

  app.patch("/users", async (req, res) => {
    const prismaEditUserRepository = new PrismaEditUserRepository();

    const editUserController = new EditUserController(prismaEditUserRepository);

    const { statusCode, body } = await editUserController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.post("/rooms", async (req, res) => {
    const prismaCreateRoomRepository = new PrismaCreateRoomRepository();

    const createRoomController = new CreateRoomController(
      prismaCreateRoomRepository
    );

    const { statusCode, body } = await createRoomController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.get("/rooms", async (req, res) => {
    const prismaGetRoomsByUserRepository = new PrismaGetRoomsByUserRepository();

    const getRoomsByUserController = new GetRoomsByUserController(
      prismaGetRoomsByUserRepository
    );

    const { statusCode, body } = await getRoomsByUserController.handle({
      params: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.delete("/rooms/:room_id", async (req, res) => {
    const prismaDeleteRoomRepository = new PrismaDeleteRoomRepository();

    const deleteRoomController = new DeleteRoomController(
      prismaDeleteRoomRepository
    );

    const { statusCode, body } = await deleteRoomController.handle({
      params: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.patch("/rooms/:room_id", async (req, res) => {
    const prismaEditRoomRepository = new PrismaEditRoomRepository();

    const editRoomController = new EditRoomController(prismaEditRoomRepository);

    const { statusCode, body } = await editRoomController.handle({
      params: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.post("/question", async (req, res) => {
    const prismaCreateQuestionRepository = new PrismaCreateQuestionRepository();

    const createQuestionController = new CreateQuestionController(
      prismaCreateQuestionRepository
    );

    const { statusCode, body } = await createQuestionController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.patch("/question", async (req, res) => {
    const prismaUpdateQuestionRepository = new PrismaUpdateQuestionRepository();

    const updateQuestionContoller = new UpdateQuestionController(
      prismaUpdateQuestionRepository
    );

    const { statusCode, body } = await updateQuestionContoller.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.delete("/question/:question_id", async (req, res) => {
    const prismaDeleteQuestionRepository = new PrismaDeleteQuestionRepository();

    const deleteQuestionController = new DeleteQuestionController(
      prismaDeleteQuestionRepository
    );

    const { statusCode, body } = await deleteQuestionController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.get("/question/:question_id", async (req, res) => {
    const prismaGetAnswersFromQuestion = new PrismGetAnswersFromQuestion();

    const getAnswersFromQuestionController =
      new GetAnswersFromQuestionController(prismaGetAnswersFromQuestion);

    const { statusCode, body } = await getAnswersFromQuestionController.handle({
      params: {
        question_id: req.params.question_id,
      },
    });

    res.status(statusCode).send(body);
  });

  app.post("/answer", async (req, res) => {
    const prismaCreateAnswerRepository = new PrismaCreateAnswerRepository();

    const createAnswerController = new CreateAnswerControler(
      prismaCreateAnswerRepository
    );

    const { statusCode, body } = await createAnswerController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.patch("/answer", async (req, res) => {
    const prismaUpdateAnswerRepository = new PrismaUpdateAnswerRepository();

    const updateAnswerController = new UpdateAnswerController(
      prismaUpdateAnswerRepository
    );

    const { statusCode, body } = await updateAnswerController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.delete("/answer/:id", async (req, res) => {
    const prismaDeleteAnswerRepository = new PrismaDeleteAnswerRepository();

    const deleteAnswerController = new DeleteAnswerController(
      prismaDeleteAnswerRepository
    );

    const { statusCode, body } = await deleteAnswerController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });

  app.post("/is-allowed", async (req, res) => {
    const prismaSetIsAllowed = new PrismaSetIsAllowedRepository();

    const setIsAllowedController = new SetIsAllowedController(
      prismaSetIsAllowed
    );

    const { statusCode, body } = await setIsAllowedController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.get("/get-is-allowed", async (req, res) => {
    const prismaGetIsAllowed = new PrismaGetIsAllowedRepository();

    const getIsAllowedController = new GetIsAllowedController(
      prismaGetIsAllowed
    );

    const { statusCode, body } = await getIsAllowedController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
  });

  app.patch("/is-allowed", async (req, res) => {
    const prismaChangeIsAllowed = new PrismaChangeIsAllowedRepository();

    const changeIsAllowedController = new ChangeIsAllowedController(
      prismaChangeIsAllowed
    );

    const { statusCode, body } = await changeIsAllowedController.handle({
      body: BodyWithToken(req),
    });

    res.status(statusCode).send(body);
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
