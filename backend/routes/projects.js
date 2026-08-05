const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "data", "projects.json");

function readProjects() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

// GET /api/projects - list all projects (summary fields only)
router.get("/", (req, res) => {
  const projects = readProjects().map(({ caseStudy, ...rest }) => rest);
  res.json(projects);
});

// GET /api/projects/:id - full project detail including case study
router.get("/:id", (req, res) => {
  const project = readProjects().find((p) => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

module.exports = router;
