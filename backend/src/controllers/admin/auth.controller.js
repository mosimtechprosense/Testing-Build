import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { requestLoginOTP, verifyLoginOTP, requestPasswordReset, resetPassword } from "../../services/admin/auth.service.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();




// LOGIN WITH PASSWORD (for users and admins)
export const loginWithPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    // Find user/admin
    const user = await prisma.admins.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid email or password" });

    // OTP required for both SUPER_ADMIN and ADMIN
    if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") {
      return res.json({ admin: true, message: "OTP required" });
    }

    // Normal users → no OTP, issue JWT
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// --- LOGIN ---
export const loginRequestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await prisma.admins.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // OTP only for SUPER_ADMIN and ADMIN
    if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") {
      await requestLoginOTP(email);
      return res.json({ message: "Login OTP sent to email" });
    }

    res.status(400).json({ message: "Normal users do not require OTP" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// --- auth.controller.js ---
export const verifyLoginOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await prisma.admins.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only SUPER_ADMIN and ADMIN require OTP
    if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") {
      // ✅ Call your service to verify OTP
      const verifiedUser = await verifyLoginOTP(email, otp);

      // --- SIGN JWT HERE ---
      const token = jwt.sign(
        {
          id: verifiedUser.id,
          role: verifiedUser.role,
          full_access: verifiedUser.role === "SUPER_ADMIN", // SUPER_ADMIN gets full access
        },
        process.env.JWT_SECRET,
        { expiresIn: "8h" }
      );

      // --- RETURN JSON WITH TOKEN ---
      return res.json({
        token,
        role: verifiedUser.role,
        full_access: verifiedUser.role === "SUPER_ADMIN",
        message: `${verifiedUser.role} logged in successfully`
      });
    }

    // If normal user somehow calls OTP endpoint
    res.status(400).json({ message: "Normal users do not require OTP" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// --- PASSWORD RESET ---
export const requestPasswordResetController = async (req, res) => {
  try {
    const { email } = req.body;
    await requestPasswordReset(email);
    res.json({ message: "Password reset OTP sent to email" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    await resetPassword(email, otp, newPassword);
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
