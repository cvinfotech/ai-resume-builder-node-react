// import { body } from "express-validator";

// export const signupValidation = [
//   body("name")
//     .trim()
//     .notEmpty()
//     .withMessage("Name is required")
//     .isLength({ min: 3 })
//     .withMessage("Name must be at least 3 characters"),

//   body("email").trim().isEmail().withMessage("Enter a valid email"),

//   body("password")
//     .isLength({ min: 8 })
//     .withMessage("Password must be at least 8 characters")
//     .matches(/[A-Z]/)
//     .withMessage("Password must contain an uppercase letter")
//     .matches(/[a-z]/)
//     .withMessage("Password must contain a lowercase letter")
//     .matches(/[0-9]/)
//     .withMessage("Password must contain a number")
//     .matches(/[!@#$%^&*]/)
//     .withMessage("Password must contain a special character"),
// ];

// export const loginValidation = [
//   body("email").trim().isEmail().withMessage("Invalid email"),

//   body("password").notEmpty().withMessage("Password is required"),
// ];
