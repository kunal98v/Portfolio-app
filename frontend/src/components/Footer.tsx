import { PROFILE } from "@/constants/content";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
        <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        <p>Designed &amp; developed by {PROFILE.name}</p>
      </div>
    </footer>
  );
}
