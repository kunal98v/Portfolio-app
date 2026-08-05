const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();
const RESUME_PATH = path.join(__dirname, "..", "public", "resume", "Kunal_Vibhute_Resume.pdf");

// GET /api/resume - downloads the resume PDF
router.get("/", (req, res) => {
  if (!fs.existsSync(RESUME_PATH)) {
    return res.status(404).json({ error: "Resume not uploaded yet. Add it at backend/public/resume/Kunal_Vibhute_Resume.pdf" });
  }
  res.download(RESUME_PATH, "Kunal_Vibhute_Resume.pdf");
});

module.exports = router;
