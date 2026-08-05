import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TERMINAL_LINES } from "@/constants/content";

interface Props {
  onFinish: () => void;
}

type RenderedLine = { type: "prompt" | "output"; text: string };

const TYPE_SPEED = 28; // ms per character
const LINE_PAUSE = 260;
const HOLD_BEFORE_EXIT = 700;

export default function TerminalIntro({ onFinish }: Props) {
  const [lines, setLines] = useState<RenderedLine[]>([]);
  const [exiting, setExiting] = useState(false);
  const skippedRef = useRef(false);

  useEffect(() => {
    // Respect reduced-motion users and let them skip instantly.
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      finish();
      return;
    }

    let cancelled = false;
    const allLines: RenderedLine[] = [];
    TERMINAL_LINES.forEach((block) => {
      allLines.push({ type: "prompt", text: block.prompt });
      block.output.forEach((line) => allLines.push({ type: "output", text: line }));
    });

    async function run() {
      for (let i = 0; i < allLines.length; i++) {
        if (cancelled || skippedRef.current) return;
        const line = allLines[i];
        let typed = "";
        for (const char of line.text) {
          if (cancelled || skippedRef.current) return;
          typed += char;
          setLines((prev) => {
            const next = [...prev];
            next[i] = { type: line.type, text: typed };
            return next;
          });
          await sleep(TYPE_SPEED);
        }
        await sleep(LINE_PAUSE);
      }
      await sleep(HOLD_BEFORE_EXIT);
      if (!cancelled) finish();
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function finish() {
    skippedRef.current = true;
    setExiting(true);
    setTimeout(onFinish, 500);
  }

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="terminal"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-base px-6"
        >
          <button
            onClick={finish}
            className="absolute top-6 right-6 font-mono text-xs text-muted hover:text-white transition-colors"
          >
            skip →
          </button>
          <div className="w-full max-w-xl rounded-xl border border-border bg-card/80 shadow-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-muted">kunal@portfolio: ~</span>
            </div>
            <div className="p-5 font-mono text-sm min-h-[220px]">
              {lines.map((line, i) => (
                <div key={i} className="mb-1.5">
                  {line.type === "prompt" ? (
                    <span>
                      <span className="text-accent-cyan">➜</span>{" "}
                      <span className="text-accent-purple">~</span>{" "}
                      <span className="text-slate-200">{line.text}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 pl-4">{line.text}</span>
                  )}
                </div>
              ))}
              <span className="inline-block h-4 w-2 bg-accent-blue animate-blink" />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
