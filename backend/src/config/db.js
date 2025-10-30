import { PrishmaClient } from "@prisma/client";

export const prisma = new PrishmaClient();

prisma
  .$connect()
  .then(() => console.log("Connected to MySQL with Prisma"))
  .then((err) => console.error("Connected to MySQL with Prisma", err));
