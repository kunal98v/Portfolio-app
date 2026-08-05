import { motion } from "framer-motion";
import { Github, Users, BookMarked, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useApi } from "@/hooks/useApi";
import type { GithubStats } from "@/constants/types";

const STAT_ICONS = { repos: BookMarked, followers: Users };

export default function GithubSection() {
  const { data, loading, error } = useApi<GithubStats>("/github/stats");

  return (
    <section id="github" className="section">
      <SectionHeading eyebrow="GitHub" title="Open-source activity." />

      {loading && <p className="text-sm text-muted font-mono">Loading GitHub stats…</p>}
      {error && (
        <p className="text-sm text-muted font-mono">
          GitHub stats aren't available right now — set GITHUB_USERNAME in the backend .env to enable this section.
        </p>
      )}

      {data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {data.avatarUrl && (
                <img src={data.avatarUrl} alt={data.name || data.username} className="h-14 w-14 rounded-full border border-border" />
              )}
              <div>
                <h3 className="font-semibold text-white">{data.name || data.username}</h3>
                <p className="text-sm text-muted">@{data.username}</p>
              </div>
            </div>
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-slate-200 hover:border-accent-blue/50 hover:text-white transition-colors"
            >
              <Github size={16} /> View Profile <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-white/5 py-4">
              <p className="text-2xl font-bold text-white">{data.publicRepos}</p>
              <p className="text-xs text-muted mt-1">Repositories</p>
            </div>
            <div className="rounded-xl bg-white/5 py-4">
              <p className="text-2xl font-bold text-white">{data.followers}</p>
              <p className="text-xs text-muted mt-1">Followers</p>
            </div>
            <div className="rounded-xl bg-white/5 py-4">
              <p className="text-2xl font-bold text-white">{data.following}</p>
              <p className="text-xs text-muted mt-1">Following</p>
            </div>
          </div>

          {data.topLanguages.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">Most used languages</p>
              <div className="flex flex-wrap gap-2">
                {data.topLanguages.map((l) => (
                  <span key={l.language} className="rounded-full bg-white/5 px-3 py-1.5 text-xs font-mono text-slate-300">
                    {l.language} · {l.count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
}
