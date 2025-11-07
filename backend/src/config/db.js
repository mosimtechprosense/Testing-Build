import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to MySQL with Prisma");
  } catch (err) {
    console.error("❌ Prisma connection error:", err);
    process.exit(1); // stop the server if DB fails
  }
}

connectDB();

export default prisma;

