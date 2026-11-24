export interface ProjectHighlight {
  title: string;
  detail: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  cardHeading: string;
  summary: string;
  category: string;
  repoUrl: string;
  overview: string;
  howItWorks: string[];
  highlights: ProjectHighlight[];
  codeSnippet: {
    file: string;
    code: string;
  };
  techStack: string[];
  metrics: Metric[];
  status: string;
}

export const PROFILE_DATA = {
  name: 'Meet Rathod',
  handles: {
    github: 'iTsukiyomi',
    alias: 'Gojo',
    discord: 'kaizen__009',
  },
  title: 'Python & backend developer',
  credentials: 'First-year BSc IT student on Arch Linux',
  links: {
    github: 'https://github.com/iTsukiyomi',
    repos: 'https://github.com/iTsukiyomi?tab=repositories',
    linkedin: 'https://www.linkedin.com/in/meet-rathod-a1326a448/',
    email: 'meetr459@gmail.com',
  },
  stackIcons: [
    { name: 'Python', icon: 'assets/icons/python.svg' },
    { name: 'FastAPI', icon: 'assets/icons/fastapi.svg' },
    { name: 'SQLite', icon: 'assets/icons/sqlite.svg' },
    { name: 'Redis', icon: 'assets/icons/redis.svg' },
    { name: 'MongoDB', icon: 'assets/icons/mongodb.svg' },
    { name: 'Discord', icon: 'assets/icons/discord.svg' },
    { name: 'Arch Linux', icon: 'assets/icons/archlinux.svg' },
    { name: 'Neovim', icon: 'assets/icons/neovim.svg' },
    { name: 'Git', icon: 'assets/icons/git.svg' },
    { name: 'curl', icon: 'assets/icons/curl.svg' },
    { name: 'C++', icon: 'assets/icons/c-plusplus.svg' },
    { name: 'TypeScript', icon: 'assets/icons/typescript.svg' },
  ],
};

export const PROJECTS_DATA: Record<string, CaseStudy> = {
  dueler: {
    id: 'dueler',
    title: 'Dueler — Pokémon Duel Discord Bot',
    cardHeading: 'Pokémon Duel Discord bot',
    summary: 'Turn-based Pokémon battles inside Discord with Showdown team imports, Elo ratings, and custom battle screens.',
    category: 'Discord Bot',
    status: 'Public repo',
    repoUrl: 'https://github.com/iTsukiyomi/dueler',
    overview:
      'A Discord bot where server members challenge each other or NPC trainers to full turn-based Pokémon battles. Both trainers pick moves or switches concurrently using asyncio events, while the battle loop resolves speed order, weather, terrain, Trick Room, held items, and abilities.',
    howItWorks: [
      'The battle loop in battle.py waits on asyncio.Event signals from both trainers each turn, handling speed-ordered send-outs, forced swaps, and forfeits.',
      'Tracks field effects like Weather, Terrain, Trick Room, Magic Room, Wonder Room, Gravity, and Inverse Battles across turns.',
      'Includes an NPC trainer AI using an 18x18 type chart, Showdown teambuilder imports, Pillow battle screens, and K=32 Elo ratings.',
    ],
    highlights: [
      {
        title: 'Async turn-based battle loop',
        detail: 'Coordinates simultaneous player choices with asyncio.Event, resolving speed priority, swaps, and field effects every turn.',
      },
      {
        title: 'Showdown teambuilder import',
        detail: 'Parses standard Showdown export text so players can paste teams directly into Discord without manual setup.',
      },
      {
        title: 'NPC AI & Elo ratings',
        detail: 'Heuristic AI checks an 18x18 type chart to pick moves or switch under 25% HP, paired with K=32 Elo tracking.',
      },
    ],
    codeSnippet: {
      file: 'pokemonduel/battle/battle.py',
      code: `self.trainer1.event.clear()
self.trainer2.event.clear()
if not self.trainer2.is_human():
    self.trainer2.move(self.trainer1.current_pokemon, self)
battle_view = await generate_main_battle_message(self)
await self.trainer1.event.wait()
await self.trainer2.event.wait()`,
    },
    techStack: ['Python', 'discord.py', 'asyncio', 'Pillow', 'SQLite'],
    metrics: [
      { label: 'Type chart', value: '18 x 18' },
      { label: 'Turn sync', value: 'asyncio' },
      { label: 'Ranking', value: 'Elo K=32' },
    ],
  },

  mafia: {
    id: 'mafia',
    title: 'Mafioso — Anime Discord Mafia Bot',
    cardHeading: 'Mafioso Discord game',
    summary: 'Anime-themed social deduction game on Discord with day trials, night actions, shops, and SQLite stats.',
    category: 'Discord Game',
    status: 'Main contributor',
    repoUrl: 'https://github.com/MafiosoStudios/Mafia',
    overview:
      'An anime-themed Mafia game built for Discord servers under MafiosoStudios. Players join lobbies, get secret roles in DMs, debate and vote during the day, and use role abilities at night.',
    howItWorks: [
      'Splits players into three factions: Protagonists (Town), Villains (Mafia), and Neutrals (Wildcards).',
      'Supports both slash commands (/lobby create, /profile, /shop inventory) and prefix commands (!lobby join).',
      'Persists player profiles, stats, inventory, cosmetics, achievements, unlocked characters, and match history in SQLite via aiosqlite.',
    ],
    highlights: [
      {
        title: 'Interactive Discord UI views',
        detail: 'Dedicated views for lobbies, day voting trials, night ability targets, role lists, and patch notes.',
      },
      {
        title: 'Persistent progression',
        detail: 'Tracks player ranks, shop items, cosmetics, and match history across games in SQLite.',
      },
      {
        title: 'Hybrid command support',
        detail: 'Every core command works as both a Discord slash command and a classic prefix command.',
      },
    ],
    codeSnippet: {
      file: 'Mafia/game_engine.py',
      code: `@dataclass(slots=True)
class GamePlayerState:
    user_id: int
    role_key: str | None = None
    faction: str | None = None
    alive: bool = True
    vote_weight: int = 1`,
    },
    techStack: ['Python 3.13', 'discord.py', 'SQLite', 'aiosqlite'],
    metrics: [
      { label: 'Factions', value: '3 teams' },
      { label: 'Storage', value: 'SQLite' },
      { label: 'Commands', value: 'Slash + !' },
    ],
  },

  pyredis: {
    id: 'pyredis',
    title: 'PyRedis — Redis Server in Python',
    cardHeading: 'PyRedis server in Python',
    summary: 'A lightweight Redis-compatible key-value server built from scratch with TCP sockets, selectors, and RESP.',
    category: 'Backend & Networking',
    status: 'Public repo',
    repoUrl: 'https://github.com/iTsukiyomi/PyRedis',
    overview:
      'I built a lightweight Redis clone from scratch in Python to learn how in-memory databases handle TCP connections, wire protocols, and key expiration without external libraries.',
    howItWorks: [
      'Uses Python socket and selectors (I/O multiplexing) to accept and serve multiple clients on one event loop.',
      'Decodes and encodes RESP (Redis Serialization Protocol) in protocol.py so standard redis-cli works out of the box.',
      'Runs both passive expiration on key reads and an active 100ms sampling cycle inside the server loop.',
    ],
    highlights: [
      {
        title: 'Works with redis-cli',
        detail: 'Implements real RESP framing so you can connect with the official redis-cli tool and run commands.',
      },
      {
        title: '11 supported commands',
        detail: 'Handles PING, ECHO, SET (with EX expiry), GET, DEL, EXISTS, INCR, DECR, EXPIRE, TTL, and PTTL.',
      },
      {
        title: 'Dual key expiration',
        detail: 'Deletes expired keys lazily when accessed and actively samples keys every 100ms.',
      },
    ],
    codeSnippet: {
      file: 'PyRedis/server.py',
      code: `while True:
    events = self.selector.select(timeout=0.1)
    self.store.active_expiry_cycle()
    for key, mask in events:
        callback = key.data
        callback(key.fileobj)`,
    },
    techStack: ['Python', 'TCP Sockets', 'selectors', 'RESP'],
    metrics: [
      { label: 'Commands', value: '11 ops' },
      { label: 'Expiry loop', value: '100ms' },
      { label: 'Client', value: 'redis-cli' },
    ],
  },

  fastapi: {
    id: 'fastapi',
    title: 'FastAPI Projects — MangaDex CLI & Pokédex API',
    cardHeading: 'FastAPI MangaDex & Pokédex tools',
    summary: 'Backend APIs and CLI tools for searching manga, charting comparisons with Pandas, and managing Pokémon teams.',
    category: 'APIs & CLI',
    status: 'Public repo',
    repoUrl: 'https://github.com/iTsukiyomi/fastapi-projects',
    overview:
      'A collection of FastAPI and Python CLI experiments. Includes a MangaDex CLI that searches and compares manga with charts, plus a Pokédex FastAPI server backed by SQLite.',
    howItWorks: [
      'MangaDex CLI queries TenRai and Jikan APIs to search titles, inspect MAL IDs, and plot comparison charts with Pandas and Matplotlib.',
      'Pokédex server exposes FastAPI GET and POST endpoints backed by SQLAlchemy and SQLite (team.db) to save Pokémon teams.',
      'Caches API responses locally in JSON files to avoid repeated network calls.',
    ],
    highlights: [
      {
        title: 'Manga comparison charts',
        detail: 'Pulls stats for multiple MAL IDs and plots side-by-side comparisons using Pandas and Matplotlib.',
      },
      {
        title: 'SQLite team persistence',
        detail: 'Uses SQLAlchemy ORM models and FastAPI dependency injection to store team members in team.db.',
      },
      {
        title: 'Local JSON caching',
        detail: 'Saves fetched manga and Pokémon payloads locally for fast repeat lookups.',
      },
    ],
    codeSnippet: {
      file: 'fastapi-projects/pokedex/poke_server.py',
      code: `@app.post("/team")
def add_poke(poke: TeamMemberCreate, db=Depends(get_db)):
    db_poke = TeamMember(name=poke.name, level=poke.level, type=poke.type)
    db.add(db_poke)
    db.commit()
    db.refresh(db_poke)
    return db_poke`,
    },
    techStack: ['Python', 'FastAPI', 'Pandas', 'Matplotlib', 'SQLAlchemy', 'SQLite'],
    metrics: [
      { label: 'Tools', value: '2 apps' },
      { label: 'Database', value: 'SQLite' },
      { label: 'Charts', value: 'Matplotlib' },
    ],
  },
};
