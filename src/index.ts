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
    console.log(req.params);

    const { statusCode, body } = await createRoomController.handle({
      body: req.body,
    });

    res.status(statusCode).send(body);
  });

  app.get("/rooms/:user_id", async (req, res) => {
    const prismaGetRoomsByUser = new PrismaGetRoomsByUserRepository();

    const getRoomsByUserController = new GetRoomsByUserController(
      prismaGetRoomsByUser
    );

    const { statusCode, body } = await getRoomsByUserController.handle({
      params: {
        user_id: req.params.user_id,
      },
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
