import { body } from "express-validator";

export const createResumeValidation = [
  // Resume Title
  body("title").trim().notEmpty().withMessage("Resume title is required"),

  // Personal Information
  body("personalInfo.full_name").optional().trim(),

  body("personalInfo.email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email"),

  body("personalInfo.phone").optional().trim(),

  body("personalInfo.location").optional().trim(),

  body("personalInfo.profession").optional().trim(),

  body("personalInfo.linkedin")
    .optional()
    .isURL()
    .withMessage("LinkedIn must be a valid URL"),

  body("personalInfo.website")
    .optional()
    .isURL()
    .withMessage("Website must be a valid URL"),

  // Professional Summary
  body("professionalSummary")
    .optional()
    .isLength({ max: 1000 })
    .withMessage("Professional summary cannot exceed 1000 characters"),

  // Experience
  body("experience")
    .optional()
    .isArray()
    .withMessage("Experience must be an array"),

  // Education
  body("education")
    .optional()
    .isArray()
    .withMessage("Education must be an array"),

  // Projects
  body("projects")
    .optional()
    .isArray()
    .withMessage("Projects must be an array"),

  // Skills
  body("skills").optional().isArray().withMessage("Skills must be an array"),
];
