const express = require("express");
const fs = require("fs");
const path = require("path");
const rateLimit = require("express-rate-limit");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "..", "data", "messages.json");

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many messages sent. Please try again later." },
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Lazily create a nodemailer transport only if SMTP env vars are configured.
function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const nodemailer = require("nodemailer");
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// POST /api/contact
router.post("/", contactLimiter, async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required" });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Please provide a valid email address" });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: "Message is too long" });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 5000),
    receivedAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    existing.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2));
  } catch (err) {
    console.error("Failed to persist message:", err);
    return res.status(500).json({ error: "Could not save your message. Please try again." });
  }

  const transport = getTransport();
  if (transport && process.env.CONTACT_TO_EMAIL) {
    try {
      await transport.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_TO_EMAIL,
        replyTo: entry.email,
        subject: `Portfolio contact from ${entry.name}`,
        text: entry.message,
      });
    } catch (err) {
      // Message is already saved, so don't fail the request over email delivery.
      console.error("Email delivery failed:", err);
    }
  }

  res.status(201).json({ success: true, message: "Thanks for reaching out — I'll get back to you soon." });
});

module.exports = router;
