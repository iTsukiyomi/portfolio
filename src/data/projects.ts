export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  language: string
  tags: string[]
  repo: string
}

export const projects: Project[] = [
  {
    id: "manga-cli",
    title: "manga-cli",
    description: "A terminal manga reader, because tabs are for quitters.",
    longDescription:
      "Reads manga straight from your terminal. Built it feature by feature instead of copying a finished spec — mostly so I'd actually understand what each part was doing.",
    language: "Python",
    tags: ["Python", "CLI"],
    repo: "https://github.com/iTsukiyomi/manga-cli",
  },
  {
    id: "fastapi-projects",
    title: "fastapi-projects",
    description: "A junk drawer of FastAPI experiments. Some good, some cursed.",
    longDescription:
      "Public sandbox for backend ideas built on FastAPI. Some of these turn into real projects. Most just teach me something and get abandoned, which is fine actually.",
    language: "Python",
    tags: ["Python", "FastAPI"],
    repo: "https://github.com/iTsukiyomi/fastapi-projects",
  },
]
