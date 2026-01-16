import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const seed = async () => {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await prisma.admins.upsert({
    where: { email: "mosimraza.techprosense@gmail.com" },
    update: {
      role: "SUPER_ADMIN",   
      name: "Mosim Raza",
    },
    create: {
      name: "Mosim Raza",
      email: "mosimraza.techprosense@gmail.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",   
      is_active: true,
    },
  });

  console.log("✅ Seeded Super Admin");
};

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
