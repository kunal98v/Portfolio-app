import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { TECH_GROUPS } from "@/constants/content";

export default function TechStack() {
  return (
    <section id="stack" className="section">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Tools I reach for."
        description="Grouped by where they sit in the stack — from language to cloud."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TECH_GROUPS.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 hover:shadow-glow hover:border-accent-blue/40 transition-all"
          >
            <h3 className="text-sm font-semibold text-white">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-lg bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
