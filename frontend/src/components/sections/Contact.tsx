import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Code2, Download, Loader2, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROFILE, SOCIALS } from "@/constants/content";
import { postContact } from "@/hooks/useApi";

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_LINKS = [
  { icon: Mail, label: PROFILE.email, href: SOCIALS.email },
  { icon: Phone, label: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}` },
  { icon: Linkedin, label: "LinkedIn", href: SOCIALS.linkedin },
  { icon: Github, label: "GitHub", href: SOCIALS.github },
  { icon: Code2, label: "LeetCode", href: SOCIALS.leetcode },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    try {
      await postContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section id="contact" className="section">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something amazing."
        description="Have a project, a role, or just want to talk backend architecture? My inbox is open."
      />

      <div className="grid lg:grid-cols-5 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-3"
        >
          {CONTACT_LINKS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 glass rounded-xl px-4 py-3.5 text-sm text-slate-300 hover:text-white hover:border-accent-blue/40 transition-colors"
            >
              <Icon size={16} className="text-accent-blue" />
              {label}
            </a>
          ))}

          <a
            href={PROFILE.resumeUrl}
            className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-3.5 text-sm font-medium text-white shadow-glow hover:opacity-90 transition-opacity"
          >
            <Download size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 glass rounded-2xl p-6 md:p-8 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-xs font-mono text-muted">Name</label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-accent-blue/60 outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-mono text-muted">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-accent-blue/60 outline-none transition-colors"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="text-xs font-mono text-muted">Message</label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-1.5 w-full rounded-lg border border-border bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:border-accent-blue/60 outline-none transition-colors resize-none"
              placeholder="What are you building?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === "loading" && <Loader2 size={16} className="animate-spin" />}
            {status === "loading" ? "Sending…" : "Send Message"}
          </button>

          {status === "success" && (
            <p className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 size={16} /> Thanks for reaching out — I'll get back to you soon.
            </p>
          )}
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
        </motion.form>
      </div>
    </section>
  );
}
