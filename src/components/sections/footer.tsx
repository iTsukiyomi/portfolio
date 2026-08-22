import { profile } from "@/data/profile"

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-[13px] text-ink-faint md:flex-row">
        <span>© {new Date().getFullYear()} {profile.name} — built at 2am, probably.</span>
        <span className="font-mono">@{profile.handle}</span>
      </div>
    </footer>
  )
}
