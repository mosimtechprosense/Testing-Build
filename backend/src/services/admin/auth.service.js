import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { sendOtpEmail } from "../../utils/sendOtpEmail.js";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

// --- OTP & hashing ---
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const hashOTP = (otp) => crypto.createHash("sha256").update(otp).digest("hex");
const otpExpiry = () => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 10); // 10 min
  return expiry;
};  

// --- Email placeholder ---
const sendOTPEmail = async (email, otp, purpose) => {
  await sendOtpEmail({
    to: email,
    otp,
    purpose,
  }); 
};


// --- REGISTER OTP (REUSABLE) ---
export const requestOTP = async (email, purpose) => {
  const user = await prisma.admins.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const otp = generateOTP();

  await prisma.auth_verification_codes.create({
    data: {
      admin_id: user.id,
      code_hash: hashOTP(otp),
      purpose,
      expires_at: otpExpiry(),
    },
  });

  await sendOTPEmail(email, otp, purpose);
  return true;
};


// --- LOGIN OTP ---
export const requestLoginOTP = (email) =>
  requestOTP(email, "ADMIN_LOGIN");



export const verifyLoginOTP = async (email, otp) => {
  const user = await prisma.admins.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const record = await prisma.auth_verification_codes.findFirst({
    where: { admin_id: user.id, purpose: "ADMIN_LOGIN" },
    orderBy: { created_at: "desc" },
  });

  if (!record) throw new Error("OTP not found");

  //  EXPIRY CHECK
  if (new Date(record.expires_at) < new Date()) {
    throw new Error("OTP expired");
  }

  //  HASH CHECK
  if (record.code_hash !== hashOTP(otp)) {
    throw new Error("Invalid OTP");
  }

  // DELETE OTP (single use)
  await prisma.auth_verification_codes.delete({
    where: { id: record.id },
  });

  return user;
};

// --- PASSWORD RESET FLOW ---
export const requestPasswordReset = (email) =>
  requestOTP(email, "PASSWORD_RESET");



export const verifyPasswordResetOTP = async (email, otp) => {
  const user = await prisma.admins.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const record = await prisma.auth_verification_codes.findFirst({
    where: { admin_id: user.id, purpose: "PASSWORD_RESET" },
    orderBy: { created_at: "desc" },
  });

  if (!record) throw new Error("OTP not found");

  if (new Date(record.expires_at) < new Date()) {
    throw new Error("OTP expired");
  }

  if (record.code_hash !== hashOTP(otp)) {
    throw new Error("Invalid OTP");
  }

  await prisma.auth_verification_codes.delete({
    where: { id: record.id },
  });

  return user;
};

export const resetPassword = async (email, otp, newPassword) => {
  const user = await verifyPasswordResetOTP(email, otp);

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  await prisma.admins.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return true;
};