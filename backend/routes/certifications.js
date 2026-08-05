const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "data", "certifications.json");

router.get("/", (req, res) => {
  const certifications = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(certifications);
});

module.exports = router;
