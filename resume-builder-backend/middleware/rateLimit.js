// import rateLimit from "express-rate-limit";

// // Login Rate Limit
// export const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 Minutes
//   max: 5,
//   message: {
//     success: false,
//     message: "Too many login attempts. Try again after 15 minutes.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // Signup Rate Limit
// export const signupLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 Hour
//   max: 5,
//   message: {
//     success: false,
//     message: "Too many signup attempts. Please try again later.",
//   },
// });

// // Forgot Password
// export const forgotPasswordLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 3,
//   message: {
//     success: false,
//     message: "Too many password reset requests.",
//   },
// });

// // Resend OTP
// export const otpLimiter = rateLimit({
//   windowMs: 5 * 60 * 1000,
//   max: 3,
//   message: {
//     success: false,
//     message: "Too many OTP requests. Please wait 5 minutes.",
//   },
// });
