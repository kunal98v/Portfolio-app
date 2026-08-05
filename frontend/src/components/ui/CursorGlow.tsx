import { useMousePosition } from "@/hooks/useMousePosition";

export default function CursorGlow() {
  const { x, y } = useMousePosition();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block transition-opacity duration-300"
      aria-hidden="true"
      style={{
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(59,130,246,0.06), transparent 40%)`,
      }}
    />
  );
}
