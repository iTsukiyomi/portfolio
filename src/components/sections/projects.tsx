import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/ui/github-icon"
import { projects } from "@/data/projects"
import { profile } from "@/data/profile"

export function Projects() {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                Work
              </p>
              <h2 className="mt-4 font-display text-[30px] font-bold leading-tight tracking-tight text-ink md:text-[36px]">
                The stuff you can see.
              </h2>
            </div>
            <p className="max-w-xs text-[14px] text-ink-dim">
              Most of what I build is small and scattered across repos. Here is the honest list.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="block w-full text-left">
                    <SpotlightCard className="h-full">
                      <div className="flex h-full flex-col p-7">
                        <div className="flex items-center justify-between">
                          <span className="rounded-md border border-border px-2 py-1 font-mono text-[11px] font-semibold text-ink-dim">
                            {p.language}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-ink-faint" />
                        </div>
                        <h3 className="mt-5 font-display text-[19px] font-bold tracking-tight text-ink">
                          {p.title}
                        </h3>
                        <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-ink-dim">
                          {p.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-border px-2 py-1 font-mono text-[11px] font-medium text-ink-dim"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <div className="p-8">
                    <span className="rounded-md border border-border px-2 py-1 font-mono text-[11px] font-semibold text-ink-dim">
                      {p.language}
                    </span>
                    <h3 className="mt-5 font-display text-[22px] font-bold tracking-tight text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-dim">
                      {p.longDescription}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] font-medium text-ink-dim"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Button className="mt-8" asChild={!!p.repo} disabled={!p.repo}>
                      {p.repo ? (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer">
                          <GithubIcon className="h-4 w-4" />
                          View repository
                        </a>
                      ) : (
                        <span>No public repo for this one yet</span>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          ))}

          <Reveal delay={projects.length * 0.08}>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[240px] flex-col items-start justify-between rounded-2xl border border-dashed border-border-hover p-7 transition-colors hover:bg-surface-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-2">
                <GithubIcon className="h-5 w-5 text-ink-dim" />
              </div>
              <div>
                <h3 className="font-display text-[19px] font-bold tracking-tight text-ink">
                  More on GitHub
                </h3>
                <p className="mt-2 flex items-center gap-1 text-[14px] text-ink-dim">
                  @{profile.handle}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
