import { Server, Globe, Sparkles, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Reveal } from "@/components/ui/reveal"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { pillars, stack, languages, profile } from "@/data/profile"

const icons = [Server, Globe, Sparkles]

export function Bento() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
            About
          </p>
          <h2 className="mt-4 max-w-lg font-display text-[30px] font-bold leading-tight tracking-tight text-ink md:text-[36px]">
            A quick, honest intro.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4 md:row-span-2">
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col justify-center p-8">
                <p className="text-[16px] leading-relaxed text-ink-dim">
                  I'm a first year B.Sc IT student, and I learn by breaking things. Mostly
                  in my own repos, not in anyone's production.
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-dim">
                  So far that means a manga tool built with{" "}
                  <span className="font-semibold text-ink">FastAPI</span>, and a plain{" "}
                  <span className="font-semibold text-ink">HTML and CSS</span> portfolio
                  before this one. Small stuff, but it's mine.
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          {pillars.map((p, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={p.title} delay={i * 0.06} className="md:col-span-2">
                <SpotlightCard className="h-full">
                  <div className="p-6">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-tint">
                      <Icon className="h-4.5 w-4.5 text-accent" strokeWidth={2} />
                    </div>
                    <h3 className="mt-4 font-display text-[16px] font-bold tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-dim">
                      {p.description}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}

          <Reveal className="md:col-span-3">
            <SpotlightCard className="h-full" tilt={false}>
              <div className="p-6">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Currently running
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border px-2 py-1 font-mono text-[11px] font-medium text-ink-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-1">
            <SpotlightCard className="h-full" tilt={false}>
              <div className="flex h-full flex-col justify-center gap-2 p-4">
                {languages.map((l) => (
                  <div key={l.name} className="flex items-baseline justify-between gap-2">
                    <span className="text-[12px] font-medium text-ink">{l.name}</span>
                    <span className="font-mono text-[9.5px] uppercase text-ink-faint">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal className="md:col-span-2">
            <SpotlightCard className="h-full" tilt={false}>
              <button onClick={copyEmail} className="flex h-full w-full flex-col justify-center p-6 text-left">
                <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                  Want to build something?
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-ink">
                  {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy my email"}
                </span>
              </button>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
