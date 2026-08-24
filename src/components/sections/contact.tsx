import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/ui/magnetic"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { GithubIcon } from "@/components/ui/github-icon"
import { profile } from "@/data/profile"

export function Contact() {
  const [copied, setCopied] = useState(false)

  function copyEmail() {
    navigator.clipboard.writeText(profile.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <SpotlightCard className="rounded-3xl" tilt={false}>
            <div className="p-10 text-center md:p-16">
              <h2 className="mx-auto max-w-md font-display text-[30px] font-bold leading-tight tracking-tight text-ink md:text-[38px]">
                Got something worth building?
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-[15px] text-ink-dim">
                I'm still new at this, but I'm around. Small tools, weird ideas, I'm in.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic>
                  <Button onClick={copyEmail}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied!" : profile.email}
                  </Button>
                </Magnetic>
                <Magnetic>
                  <Button variant="outline" asChild>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
