import express from "express";
import { PrismaCreateUserRepository } from "./repositories/create-user/prisma-create-user";
import { CreateUserController } from "./controllers/create-user/create-user";
import { config } from "dotenv";

async function main() {
  config();

  const app = express();

  app.use(express.json());

  const port = process.env.PORT || 8000;

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

main();
