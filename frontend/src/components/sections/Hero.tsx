import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Code2, Globe } from "lucide-react";
import { PROFILE, SOCIALS, FLOATING_TECH } from "@/constants/content";

const SOCIAL_ICONS = [
  { icon: Github, href: SOCIALS.github, label: "GitHub" },
  { icon: Linkedin, href: SOCIALS.linkedin, label: "LinkedIn" },
  { icon: Code2, href: SOCIALS.leetcode, label: "LeetCode" },
  { icon: Globe, href: SOCIALS.portfolio, label: "Portfolio" },
  { icon: Mail, href: SOCIALS.email, label: "Email" },
];

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center pt-24">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="eyebrow">Hi, I'm</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {PROFILE.name}
          </h1>
          <h2 className="mt-3 text-xl md:text-2xl font-semibold gradient-text">
            {PROFILE.role}
          </h2>
          <p className="mt-6 max-w-lg text-muted leading-relaxed">
            Building scalable backend systems, AI agents, MCP servers, RAG
            applications, and production-grade web platforms.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={PROFILE.resumeUrl}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition-opacity"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-slate-200 hover:border-accent-blue/60 hover:text-white transition-colors"
            >
              <Mail size={16} /> Contact Me
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {SOCIAL_ICONS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted hover:text-white hover:border-accent-blue/60 hover:-translate-y-0.5 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: floating tech visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative hidden lg:block h-[440px]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full bg-gradient-to-br from-accent-blue/20 via-accent-purple/15 to-accent-cyan/20 blur-2xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass h-40 w-40 rounded-3xl flex items-center justify-center shadow-glow">
              <span className="font-mono text-xs text-accent-cyan text-center leading-relaxed">
                AI
                <br />
                Backend
                <br />
                Engineer
              </span>
            </div>
          </div>

          {FLOATING_TECH.map((tech, i) => {
            const angle = (i / FLOATING_TECH.length) * 2 * Math.PI;
            const radius = 190;
            const x = 50 + (radius / 4.4) * Math.cos(angle);
            const y = 50 + (radius / 4.4) * Math.sin(angle);
            return (
              <motion.div
                key={tech}
                className="absolute rounded-xl glass px-3 py-1.5 text-xs font-mono text-slate-300 shadow-card"
                style={{ left: `${x}%`, top: `${y}%` }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              >
                {tech}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
