export function WireSphere() {
  return (
    <div className="relative flex h-full items-center justify-center" style={{ perspective: "600px" }}>
      <div
        className="relative h-24 w-24 rounded-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 rounded-full border"
          style={{ borderColor: "var(--color-border-hover)", animation: "spin-slow 14s linear infinite" }}
        />
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: "var(--color-border-hover)",
            transform: "rotateX(70deg)",
            animation: "spin-slow-reverse 10s linear infinite",
          }}
        />
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: "var(--color-accent)",
            opacity: 0.5,
            transform: "rotateY(70deg)",
            animation: "spin-slow 18s linear infinite",
          }}
        />
        <div
          className="absolute inset-3 rounded-full"
          style={{ background: "color-mix(in srgb, var(--color-accent) 18%, transparent)", filter: "blur(8px)" }}
        />
      </div>
    </div>
  )
}
