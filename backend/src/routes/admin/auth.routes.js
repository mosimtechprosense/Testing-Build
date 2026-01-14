import express from "express";
import {
  loginRequestOTP,
  verifyLoginOTPController,
  requestPasswordResetController,
  resetPasswordController,
  loginWithPassword,
} from "../../controllers/admin/auth.controller.js";

const router = express.Router();

// --- LOGIN FLOW ---
router.post("/login-password", loginWithPassword);  // NEW: password login
router.post("/login", loginRequestOTP);            // Admin OTP request
router.post("/verify-otp", verifyLoginOTPController);

// --- PASSWORD RESET FLOW ---
router.post("/password-reset/request", requestPasswordResetController);
router.post("/password-reset/verify", resetPasswordController);

export default router;
