import { useRef, useState, type ReactNode, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
}

export function SpotlightCard({ children, className, tilt = true }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPos({ x, y })
    if (tilt) {
      const px = (x / rect.width - 0.5) * 2
      const py = (y / rect.height - 0.5) * 2
      setRot({ x: py * -6, y: px * 6 })
    }
  }

  function reset() {
    setActive(false)
    setRot({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={reset}
      style={{
        transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: "transform 0.25s ease-out, border-color 0.25s ease, box-shadow 0.25s ease",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface hover:border-border-hover",
        "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, color-mix(in srgb, var(--color-accent) 15%, transparent), transparent 70%)`,
        }}
      />
      <div className="relative" style={{ transform: "translateZ(24px)" }}>
        {children}
      </div>
    </div>
  )
}
