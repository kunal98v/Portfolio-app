require("dotenv").config();
const express = require("express");
const cors = require("cors");

const projectsRouter = require("./routes/projects");
const experienceRouter = require("./routes/experience");
const certificationsRouter = require("./routes/certifications");
const contactRouter = require("./routes/contact");
const githubRouter = require("./routes/github");
const resumeRouter = require("./routes/resume");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok", uptime: process.uptime() }));

app.use("/api/projects", projectsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/certifications", certificationsRouter);
app.use("/api/contact", contactRouter);
app.use("/api/github", githubRouter);
app.use("/api/resume", resumeRouter);
app.get("/api/docker-test", (req, res) => {
  res.json({
    message: "Hello from Docker!",
    version: "v2"
  });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: "Not found 404" }));

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong on the server" });
});



app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
});
