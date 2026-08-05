import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { useApi } from "@/hooks/useApi";
import type { Project } from "@/constants/types";

export default function Projects() {
  const { data, loading, error } = useApi<Project[]>("/projects");
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="projects" className="section">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Things I've shipped."
        description="A few projects that show how I think about backend architecture and applied AI."
      />

      {loading && <p className="text-sm text-muted font-mono">Loading projects…</p>}
      {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

      {data && (
        <div className="grid md:grid-cols-2 gap-6">
          {data.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onOpenCaseStudy={setActiveId} />
          ))}
        </div>
      )}

      <ProjectModal projectId={activeId} onClose={() => setActiveId(null)} />
    </section>
  );
}
