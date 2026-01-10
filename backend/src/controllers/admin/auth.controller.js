import jwt from "jsonwebtoken";
import { requestLoginOTP, verifyLoginOTP, requestPasswordReset, resetPassword } from "../../services/admin/auth.service.js";

// --- LOGIN ---
export const loginRequestOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    await requestLoginOTP(email);
    res.json({ message: "Login OTP sent to email" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const verifyLoginOTPController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await verifyLoginOTP(email, otp);

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token });
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
