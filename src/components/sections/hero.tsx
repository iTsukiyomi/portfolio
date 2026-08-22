import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"
import { Spotlight } from "@/components/ui/spotlight"

const words = ["I", "build", "bots", "that", "argue", "better", "than", "me."]

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 pb-24 md:pt-36 md:pb-32">
      <Spotlight />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[12px] font-medium text-ink-dim">
            open to new projects, probably
          </span>
        </motion.div>

        <h1 className="font-display text-[44px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[62px] md:text-[80px]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`inline-block mr-[0.28em] ${w === "argue" ? "text-accent" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mx-auto mt-8 max-w-lg text-[17px] leading-relaxed text-ink-dim"
        >
          First-year IT student who'd rather ship something broken than read one more
          tutorial. Discord bots, low-level C++, and a compiler I probably didn't need
          to build. Goes by <span className="font-semibold text-ink">iTsukiyomi</span> online.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.82 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Button asChild>
              <a href="#work">
                See what I've made
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button variant="outline" asChild>
              <a href="#contact">Say hi</a>
            </Button>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
