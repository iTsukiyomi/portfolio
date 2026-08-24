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
    id: "mafioso",
    title: "Discord game",
    description: "A discord game just like among us (but anime version). Made for my friends.",
    longDescription:
      "A bot about finding the imposters (mafia in our case), with multiple factions and everyone having unique role and abilities.",
    language: "Python, MongoDB",
    tags: ["Python", "MongoDB"],
    repo: "https://github.com/MafiosoStudios/Mafia",
  },
  {
    id: "portfolio-v1",
    title: "Personal Portfolio Website",
    description: "A simple HTML and CSS site with basic details and projects.",
    longDescription:
      "A portfolio showcasing some of my projects built with nextjs, react, framer motion, tailwind CSS and UIs from acternity.",
    language: "HTML/CSS, TypeScript",
    tags: ["HTML", "CSS", "TypeScript", "NextJS", "React", "Framer-Motion", "Tailwind-CSS"],
    repo: "https://github.com/iTsukiyomi/portfolio",
  },
]
