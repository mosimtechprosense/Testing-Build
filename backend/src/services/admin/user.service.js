import { PrismaClient } from "@prisma/client";
import { requestOTP } from "./auth.service.js";

const prisma = new PrismaClient();

// --- User CRUD ---
export const createUser = async ({ name, email, role }) => {
  if (!["LEAD_USER", "DATA_ENTRY_USER"].includes(role)) throw new Error("Invalid role");

  const user = await prisma.admins.create({
    data: { name, email, role },
  });

  // First-time OTP
  await requestOTP(email, "FIRST_TIME_SETUP");
  return user;
};

export const listUsers = async () => {
  return await prisma.admins.findMany({
    where: { role: { not: "ADMIN" } },
    select: { id: true, name: true, email: true, role: true, is_active: true },
  });
};

export const updateUser = async (id, data) => {
  return await prisma.admins.update({
    where: { id: BigInt(id) },
    data,
  });
};

export const deleteUser = async (id) => {
  return await prisma.admins.delete({
    where: { id: BigInt(id) },
  });
};
