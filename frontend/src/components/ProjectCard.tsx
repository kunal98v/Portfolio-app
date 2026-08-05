import { motion } from "framer-motion";
import { Github, ExternalLink, FileText } from "lucide-react";
import type { Project } from "@/constants/types";

interface Props {
  project: Project;
  index: number;
  onOpenCaseStudy: (id: string) => void;
}

export default function ProjectCard({ project, index, onOpenCaseStudy }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group glass rounded-2xl overflow-hidden hover:shadow-glow hover:border-accent-blue/40 transition-all"
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white">{project.title}</h3>
        <p className="mt-1 text-sm text-accent-cyan/80 font-mono">{project.tagline}</p>
        <p className="mt-3 text-sm text-muted leading-relaxed">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full border border-border px-2.5 py-1 text-xs font-mono text-slate-400">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <Github size={16} /> Code
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          <button
            onClick={() => onOpenCaseStudy(project.id)}
            className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <FileText size={14} /> Case Study
          </button>
        </div>
      </div>
    </motion.article>
  );
}
