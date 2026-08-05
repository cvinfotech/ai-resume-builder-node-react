import express from "express";
import upload from "../config/multer.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

import {
  signupValidation,
  loginValidation,
} from "../validators/authValidator.js";

import {
  loginLimiter,
  signupLimiter,
  forgotPasswordLimiter,
  otpLimiter,
} from "../middleware/rateLimit.js";

import {
  signup,
  verifyEmail,
  resendOTP,
  login,
  forgotPassword,
  resendForgotPasswordOTP,
  verifyOTP,
  resetPassword,
  profile,
  updateProfile,
  changePassword,
  logout,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

//Registeration
router.post(
  "/signup",
  signupLimiter,
  signupValidation,
  validationMiddleware,
  signup,
);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", otpLimiter, resendOTP);

//Login
router.post(
  "/login",
  loginLimiter,
  loginValidation,
  validationMiddleware,
  login,
);

//Forgot paaword
router.post("/forgot-password", forgotPasswordLimiter, forgotPassword);
router.post("/forgot-password/resend-otp", otpLimiter, resendForgotPasswordOTP);
router.post("/reset-password", resetPassword);

//User Profile
router.get("/profile", authMiddleware, profile);
router.put("/profile", authMiddleware, upload.single("image"), updateProfile);

//Change Password
router.put("/change-password", authMiddleware, changePassword);
router.post("/verify-otp", verifyOTP);

//Logout
router.post("/logout", logout);

export default router;
