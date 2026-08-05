import { motion } from "framer-motion";
import { Server, Bot, Network } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROFILE } from "@/constants/content";

const PILLARS = [
  {
    icon: Server,
    title: "Backend Systems",
    text: "REST APIs and services designed to hold up under real production load.",
  },
  {
    icon: Bot,
    title: "AI Applications",
    text: "Agentic workflows, RAG pipelines, and MCP tool integrations that do real work.",
  },
  {
    icon: Network,
    title: "Scalable Infrastructure",
    text: "Observability and reliability baked in from Prometheus to Grafana to Loki.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading eyebrow="About" title="Backend-first, AI-native." />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3 text-lg leading-relaxed text-slate-300"
        >
          {PROFILE.about}
        </motion.p>

        <div className="lg:col-span-2 grid gap-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-5 hover:border-accent-blue/50 transition-colors"
            >
              <p.icon size={20} className="text-accent-blue" />
              <h3 className="mt-3 text-sm font-semibold text-white">{p.title}</h3>
              <p className="mt-1.5 text-sm text-muted leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
