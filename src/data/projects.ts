export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  language: string
  tags: string[]
  repo?: string
}

export const projects: Project[] = [
  {
    id: "mangadex-cli",
    title: "MangaDex CLI",
    description: "A command line tool to search, compare, and get info on manga.",
    longDescription:
      "Built with FastAPI, using public manga APIs. Pandas and Matplotlib do the comparing and charting. All from the terminal, no browser required.",
    language: "Python",
    tags: ["Python", "FastAPI", "Pandas"],
    repo: "https://github.com/iTsukiyomi/fastapi-projects",
  },
  {
    id: "portfolio-v1",
    title: "Personal Portfolio Website",
    description: "A simple HTML and CSS site with basic details and projects.",
    longDescription:
      "An earlier, simpler portfolio built with plain HTML and CSS. No framework, no build step, just a straightforward page to show what I was working on at the time.",
    language: "HTML/CSS",
    tags: ["HTML", "CSS"],
  },
]
