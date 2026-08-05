import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useApi } from "@/hooks/useApi";
import type { Certification } from "@/constants/types";

export default function Certifications() {
  const { data, loading, error } = useApi<Certification[]>("/certifications");

  return (
    <section id="certifications" className="section">
      <SectionHeading eyebrow="Certifications" title="Credentials." />

      {loading && <p className="text-sm text-muted font-mono">Loading certifications…</p>}
      {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

      {data && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6 hover:border-accent-cyan/40 hover:shadow-glow transition-all"
            >
              <Award size={20} className="text-accent-cyan" />
              <h3 className="mt-4 text-sm font-semibold text-white">{cert.title}</h3>
              <p className="mt-1 text-xs text-muted font-mono">{cert.issuer}</p>
              <p className="mt-3 text-xs text-slate-500">{cert.year}</p>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
