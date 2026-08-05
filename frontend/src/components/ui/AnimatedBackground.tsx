/**
 * Ambient backdrop: a faint grid + soft moving gradient glows.
 * Kept lightweight (pure CSS, no canvas) so it never competes with content.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base" aria-hidden="true">
      <div className="absolute inset-0 bg-hero-grid bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 bg-grid-glow animate-gradient-x bg-[length:200%_200%]" />
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-accent-blue/10 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-96 w-96 rounded-full bg-accent-purple/10 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-accent-cyan/10 blur-[120px]" />
    </div>
  );
}
