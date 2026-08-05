import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useApi } from "@/hooks/useApi";
import type { ExperienceEntry } from "@/constants/types";

export default function Experience() {
  const { data, loading, error } = useApi<ExperienceEntry[]>("/experience");

  return (
    <section id="experience" className="section">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've built things."
        description="Two years of shipping backend systems and AI features that made it to production."
      />

      {loading && <p className="text-sm text-muted font-mono">Loading experience…</p>}
      {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

      {data && (
        <ol className="relative border-l border-border pl-8 space-y-14">
          {data.map((job, i) => (
            <motion.li
              key={job.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative"
            >
              <span className="absolute -left-[41px] top-1 h-3.5 w-3.5 rounded-full bg-base border-2 border-accent-blue shadow-glow" />

              <div className="glass rounded-2xl p-6 md:p-8 hover:border-accent-purple/40 transition-colors">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold text-white">
                    {job.role} · <span className="gradient-text">{job.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted">{job.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">{job.summary}</p>

                <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-accent-cyan mt-1">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs font-mono text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}
