import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import pdfUpload from "../middleware/upload.js";

import { importResume } from "../controllers/pdfController.js";

const router = express.Router();

router.post(
  "/import",
  authMiddleware,
  pdfUpload.single("resume"),
  importResume,
);

export default router;
