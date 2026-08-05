import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import type { ProjectDetail } from "@/constants/types";

interface Props {
  projectId: string | null;
  onClose: () => void;
}

export default function ProjectModal({ projectId, onClose }: Props) {
  const { data, loading, error } = useApi<ProjectDetail>(projectId ? `/projects/${projectId}` : "");

  useEffect(() => {
    if (!projectId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [projectId, onClose]);

  return (
    <AnimatePresence>
      {projectId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="glass max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl shadow-card"
            role="dialog"
            aria-modal="true"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card/95 px-6 py-4 backdrop-blur">
              <h3 className="text-lg font-bold text-white">
                {loading ? "Loading…" : data?.title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="text-muted hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {loading && <p className="text-sm text-muted font-mono">Loading case study…</p>}
              {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

              {data && (
                <>
                  <img
                    src={data.image}
                    alt={`${data.title} architecture preview`}
                    className="w-full rounded-xl border border-border"
                  />

                  <div className="flex flex-wrap gap-2">
                    {data.tech.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-1 text-xs font-mono text-slate-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <section>
                    <h4 className="eyebrow">Problem</h4>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">{data.caseStudy.problem}</p>
                  </section>

                  <section>
                    <h4 className="eyebrow">Solution</h4>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">{data.caseStudy.solution}</p>
                  </section>

                  <section>
                    <h4 className="eyebrow">Architecture</h4>
                    <ul className="mt-2 space-y-1.5">
                      {data.caseStudy.architecture.map((step) => (
                        <li key={step} className="flex gap-2 text-sm text-slate-300">
                          <span className="text-accent-blue mt-1">▹</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4 className="eyebrow">Challenges</h4>
                    <ul className="mt-2 space-y-1.5">
                      {data.caseStudy.challenges.map((c) => (
                        <li key={c} className="flex gap-2 text-sm text-slate-300">
                          <span className="text-accent-purple mt-1">▹</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="flex gap-4 pt-2">
                    <a
                      href={data.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-slate-200 hover:border-accent-blue/50 hover:text-white transition-colors"
                    >
                      <Github size={16} /> View Code
                    </a>
                    {data.demo && (
                      <a
                        href={data.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple px-4 py-2 text-sm font-medium text-white shadow-glow hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
