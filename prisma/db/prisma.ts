import { PrismaClient } from "@prisma/client";

const prismaDB = new PrismaClient({ log: ["query"] });

export default prismaDB;
