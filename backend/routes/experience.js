const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "data", "experience.json");

router.get("/", (req, res) => {
  const experience = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  res.json(experience);
});

module.exports = router;
