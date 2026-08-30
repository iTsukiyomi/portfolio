import { useState } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { profile } from "@/data/profile"

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Say hi", href: "#contact" },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0
    const direction = current - previous

    if (current < 80) {
      setVisible(true)
    } else if (direction < 0) {
      setVisible(true)
    } else if (direction > 0) {
      setVisible(false)
    }
  })

  return (
    <AnimatePresence mode="wait">
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 z-40 w-full border-b border-border bg-bg/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
              <span className="font-display text-sm font-bold text-white">M</span>
            </div>
            <span className="font-display text-[16px] font-semibold tracking-tight text-ink">
              {profile.name}
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[14px] font-medium text-ink-dim transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <Button size="sm" asChild className="hidden shadow-none sm:inline-flex">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}