import express from "express";
import { PrismaCreateUserRepository } from "./repositories/create-user/prisma-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { config } from "dotenv";
import prismaDB from "../prisma/db/prisma";
import { PrismaLoginUserRepository } from "./repositories/login-user/prisma-login-user";
import { LoginUserController } from "./controllers/login-user/login-user";

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

    const { statusCode, body } = loginUserController.handle({
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
