export interface CaseStudy {
  id: string;
  title: string;
  shortDesc: string;
  typeTag: string;
  repoUrl: string;
  demoUrl?: string;
  problem: string;
  architectureDiagramSvg: string;
  architectureNotes: string[];
  hardestDecisions: {
    title: string;
    decision: string;
    tradeoff: string;
  }[];
  whatBroke: {
    incident: string;
    errorTraceback: string;
    rootCause: string;
    fix: string;
  };
  retrospective: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
}

export const PROJECTS_DATA: Record<string, CaseStudy> = {
  dueler: {
    id: 'dueler',
    title: 'Pokémon Duel — Discord Battle Engine',
    shortDesc: 'Turn-based battle simulator on Discord with switch-prediction AI and web team builder.',
    typeTag: 'BOT // ASYNCIO',
    repoUrl: 'https://github.com/iTsukiyomi/pypoke',
    demoUrl: 'https://github.com/iTsukiyomi/dueler',
    problem:
      'Most Discord combat bots are simple RNG button-mashers. I wanted a true battle simulator modeling competitive Gen 4 mechanics: speed priority brackets, physical/special damage split, stat stages (-6 to +6), and weather effects, with an AI opponent predicting switches under Discord API limits.',
    architectureDiagramSvg: `<svg viewBox="0 0 720 220" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; max-width: 700px; display: block; margin: 0 auto;">
  <rect width="720" height="220" fill="transparent"/>
  <!-- Discord Layer -->
  <rect x="10" y="30" width="160" height="70" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="90" y="60" fill="var(--ink)" font-family="var(--font-mono)" font-size="12" font-weight="700" text-anchor="middle">DISCORD CLIENT</text>
  <text x="90" y="80" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">Slash Cmds + Buttons</text>

  <!-- Arrow 1 -->
  <line x1="170" y1="65" x2="220" y2="65" stroke="var(--border)" stroke-width="2"/>
  <polygon points="220,60 230,65 220,70" fill="var(--border)"/>

  <!-- Asyncio Bot Layer -->
  <rect x="230" y="30" width="160" height="70" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="310" y="60" fill="var(--ink)" font-family="var(--font-mono)" font-size="12" font-weight="700" text-anchor="middle">DISCORD.PY BOT</text>
  <text x="310" y="80" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">Session Lock &amp; Rate Guard</text>

  <!-- Arrow 2 -->
  <line x1="390" y1="65" x2="440" y2="65" stroke="var(--border)" stroke-width="2"/>
  <polygon points="440,60 450,65 440,70" fill="var(--border)"/>

  <!-- Battle Engine -->
  <rect x="450" y="20" width="250" height="90" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
  <text x="575" y="48" fill="var(--ink)" font-family="var(--font-mono)" font-size="12" font-weight="700" text-anchor="middle">IMMUTABLE BATTLE ENGINE</text>
  <text x="575" y="68" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">Turn Priority &amp; Heuristic AI</text>
  <text x="575" y="88" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">(pokemon.py | moves.py | ptypes.py)</text>

  <!-- Bottom Feedback Arrow -->
  <path d="M 575 110 L 575 170 L 90 170 L 90 100" stroke="var(--border)" stroke-width="2" stroke-dasharray="4 4" fill="none"/>
  <polygon points="85,105 90,95 95,105" fill="var(--border)"/>
  <text x="330" y="190" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="10" text-anchor="middle">Immutable State Snapshot &rarr; Rendered Discord Embed/Buttons</text>
</svg>`,
    architectureNotes: [
      'Battle Core is strictly decoupled from Discord.py: engine modules accept TurnIntent and return immutable BattleSnapshot objects.',
      'Heuristic Minimax Evaluator runs with a 2-ply horizon, scoring offensive type coverage, defensive switch penalties, and remaining HP fractions.',
      'FastAPI companion service shares JSON move definitions with the Python bot, allowing team composition presets via HMAC tokens.',
    ],
    hardestDecisions: [
      {
        title: 'Immutable Snapshots vs In-Place Object Mutation',
        decision:
          'Engine evaluates moves by producing a complete deep-copied BattleSnapshot rather than modifying live Pokémon instances.',
        tradeoff:
          'Modest allocation overhead per turn, but completely eliminated Discord race conditions where rapid double-clicks on move buttons corrupted game state.',
      },
      {
        title: 'Heuristic Minimax Horizon vs 3-Second Discord Timeout',
        decision:
          'Capped AI branch depth to 2 plies with alpha-beta pruning and an early exit if winning move is guaranteed.',
        tradeoff:
          'Sacrificed complex long-term setup predictions (e.g. 5-turn Dragon Dance stalls) to ensure response times stay under 450ms.',
      },
      {
        title: 'Token-Based HMAC Handoff for Web Team Builder',
        decision:
          'Generated a 15-minute cryptographically signed URL token for web team configuration rather than requiring full Discord OAuth2 login.',
        tradeoff:
          'Slightly weaker security perimeter than full OAuth, but reduced friction from 30 seconds of browser redirect down to a single click.',
      },
    ],
    whatBroke: {
      incident:
        'Battle engine threw unhandled KeyError during tournament play when calculating damage for multi-strike moves.',
      errorTraceback: `Traceback (most recent call last):
  File "game.py", line 184, in execute_turn
    dmg, is_crit = calculate_damage(attacker, defender, move)
  File "moves.py", line 92, in calculate_damage
    category = move_data['damage_class']['name']
KeyError: 'damage_class'
[FATAL] Session 9402: ValueError: min() arg is an empty sequence in battle loop`,
      rootCause:
        'Custom move dictionary loaded from cached raw PokeAPI JSON had inconsistent schema keys for Generation 4 physical/special moves that featured secondary hit counters.',
      fix:
        'Implemented strict Pydantic/dataclass move schema with explicit default fallback resolvers, and added regression tests for all 165 implemented moves.',
    },
    retrospective:
      'Discord button grids (max 5 buttons per row) are fundamentally ill-suited for tactical games with 4 moves, switches, and items. Future versions should stream interactive canvas frames via WebSocket to the companion web app.',
    techStack: ['Python 3.12', 'discord.py', 'asyncio', 'FastAPI', 'Pydantic', 'uv'],
    metrics: [
      { label: 'Turn Latency', value: '< 180ms' },
      { label: 'Damage Calc Accuracy', value: '100% Gen4 Match' },
      { label: 'Concurrent Battles', value: '120+ active' },
    ],
  },

  mafioso: {
    id: 'mafioso',
    title: 'Mafioso — Discord Mafia Bot',
    shortDesc: 'Discord social deduction bot running 8 to 16 player matches with strict phase timers and atomic voting.',
    typeTag: 'BOT // MONGODB',
    repoUrl: 'https://github.com/iTsukiyomi/mafia-asssistant',
    demoUrl: 'https://github.com/iTsukiyomi/Mafia',
    problem:
      'Discord hidden-role games break when timers drift or players hammer votes simultaneously. I built a state machine handling Day Discussion, Voting, and Night Actions with atomic Redis locks to prevent duplicate votes.',
    architectureDiagramSvg: `<svg viewBox="0 0 720 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; max-width: 700px; display: block; margin: 0 auto;">
  <rect width="720" height="180" fill="transparent"/>
  <!-- States -->
  <rect x="20" y="40" width="110" height="60" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="75" y="75" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">LOBBY</text>

  <line x1="130" y1="70" x2="170" y2="70" stroke="var(--border)" stroke-width="2"/>

  <rect x="170" y="40" width="110" height="60" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="225" y="65" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">DAY PHASE</text>
  <text x="225" y="85" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Open Debate</text>

  <line x1="280" y1="70" x2="320" y2="70" stroke="var(--border)" stroke-width="2"/>

  <rect x="320" y="40" width="110" height="60" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="375" y="65" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">VOTING</text>
  <text x="375" y="85" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Atomic CAS Tally</text>

  <line x1="430" y1="70" x2="470" y2="70" stroke="var(--border)" stroke-width="2"/>

  <rect x="470" y="40" width="110" height="60" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="525" y="65" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">NIGHT PHASE</text>
  <text x="525" y="85" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Private Action Q</text>

  <line x1="580" y1="70" x2="620" y2="70" stroke="var(--border)" stroke-width="2"/>

  <rect x="620" y="40" width="85" height="60" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
  <text x="662" y="75" fill="var(--ink)" font-family="var(--font-mono)" font-size="10" font-weight="700" text-anchor="middle">RESOLVE</text>

  <!-- Loopback -->
  <path d="M 662 100 L 662 140 L 225 140 L 225 100" stroke="var(--border)" stroke-width="2" stroke-dasharray="3 3" fill="none"/>
  <polygon points="220,105 225,95 230,105" fill="var(--border)"/>
  <text x="440" y="155" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Loop until Town / Mafia parity reached</text>
</svg>`,
    architectureNotes: [
      'Discrete FSM phases managed via Python async context managers with guaranteed task cancellation.',
      'Night action queue processes interactions sequentially: Doctor protects first, Escort blocks second, Mafia kills third, Detective inspects last.',
      'Player ratings and match histories persisted to MongoDB with atomic document updates.',
    ],
    hardestDecisions: [
      {
        title: 'Ephemeral Buttons in Ephemeral Channels vs Direct Messages',
        decision:
          'Migrated private night target selection into auto-created private Discord threads rather than sending bot DMs.',
        tradeoff:
          'Requires server administrator permissions to manage channels, but eliminated the 35% drop rate caused by user Discord privacy settings blocking bot DMs.',
      },
      {
        title: 'Atomic Compare-And-Swap on Lynch Hammer Votes',
        decision:
          'Used Redis lock during vote evaluation to guarantee only one lynch executes when multiple votes arrive within the same network frame.',
        tradeoff:
          'Added Redis dependency, but eradicated ghost duplicate lynches during frantic vote countdowns.',
      },
      {
        title: 'Declarative Role Resolution Priority Matrix',
        decision:
          'Refactored nested if/else role checks into an integer priority table (RolePriority: Doc=10, Escort=20, Mafia=30, Cop=40).',
        tradeoff:
          'Initial refactor took three days, but reduced new role implementation from 200 lines to a 15-line configuration schema.',
      },
    ],
    whatBroke: {
      incident:
        'Night phase timer task failed to cancel when unanimous night submissions completed early, causing the timer to fire mid-Day and trigger an immediate night skip.',
      errorTraceback: `Task exception was never retrieved
future: <Task finished name='Task-412' coro=<Game.night_timer() done, defined at game.py:311> exception=CancelledError()>
Traceback (most recent call last):
  File "game.py", line 316, in night_timer
    await asyncio.sleep(remaining_time)
asyncio.exceptions.CancelledError
[ERROR] State desync: Transition(NIGHT -> DAY) called while already in DAY`,
      rootCause:
        'Unhandled asyncio.CancelledError inside the timer task caused state transition callbacks to execute twice.',
      fix:
        'Wrapped all phase timer sleep loops in strict try/except asyncio.CancelledError blocks and introduced an explicit state guard lock.',
    },
    retrospective:
      'Should have implemented an event-sourced architecture from day one instead of mutating a game state dictionary in memory.',
    techStack: ['Python 3.12', 'discord.py', 'MongoDB / Motor', 'Redis', 'asyncio'],
    metrics: [
      { label: 'Games Hosted', value: '450+ matches' },
      { label: 'Role Types', value: '14 implemented' },
      { label: 'Avg Phase Switch', value: '42ms' },
    ],
  },

  'ani-cpp': {
    id: 'ani-cpp',
    title: 'ani-cli.cpp — Native C++20 Media Streamer',
    shortDesc: 'Native C++20 terminal streaming tool with sub-6ms startup and zero dependencies.',
    typeTag: 'SYSTEMS // C++20',
    repoUrl: 'https://github.com/iTsukiyomi/ani-cpp',
    problem:
      'The original shell script broke on non-standard setups due to its fragile chain of curl, grep, sed, and fzf. I built a native C++20 port with a custom ANSI VT100 terminal interface and automated POSIX process management.',
    architectureDiagramSvg: `<svg viewBox="0 0 720 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; max-width: 700px; display: block; margin: 0 auto;">
  <rect width="720" height="180" fill="transparent"/>
  <!-- Pipeline -->
  <rect x="20" y="45" width="130" height="65" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="85" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">USER QUERY</text>
  <text x="85" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Terminal TUI / CLI</text>

  <line x1="150" y1="77" x2="190" y2="77" stroke="var(--border)" stroke-width="2"/>

  <rect x="190" y="45" width="140" height="65" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="260" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">LIBCURL CLIENT</text>
  <text x="260" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Connection Pool</text>

  <line x1="330" y1="77" x2="370" y2="77" stroke="var(--border)" stroke-width="2"/>

  <rect x="370" y="45" width="150" height="65" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="445" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">HTML AST SCRAPER</text>
  <text x="445" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Fast C++ Tokenizer</text>

  <line x1="520" y1="77" x2="560" y2="77" stroke="var(--border)" stroke-width="2"/>

  <rect x="560" y="45" width="140" height="65" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
  <text x="630" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">MPV SPAWN (IPC)</text>
  <text x="630" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">fork() + execvp() / WNOHANG</text>
</svg>`,
    architectureNotes: [
      'Self-contained ANSI escape sequence engine replaces external ncurses library, keeping binary size under 380 KB stripped.',
      'Libcurl wrapper features connection reuse and socket timeout guards.',
      'Targeted POSIX fork/exec subprocess control on Linux with Win32 CreateProcess fallback.',
    ],
    hardestDecisions: [
      {
        title: 'Bypassing ncurses for Raw VT100 Escape Sequences',
        decision:
          'Implemented custom raw terminal mode using termios (`tcgetattr`, `tcsetattr`, `\\033[?1049h`).',
        tradeoff:
          'Required hand-writing window resize handlers (`SIGWINCH`), but eliminated heavy ncurses link dependency.',
      },
      {
        title: 'String Tokenizer vs External HTML Parser Library',
        decision:
          'Built a fast DOM-less token parser scanning for target video streaming iframe patterns.',
        tradeoff:
          'Vulnerable to drastic source HTML restructuring, but delivered 12x faster scraping than python-based alternatives.',
      },
      {
        title: 'POSIX Signal Handling for Clean Subprocess Exit',
        decision:
          'Hooked `SIGINT` and `SIGTERM` to safely reap spawned mpv player instances and restore terminal cursor visibility.',
        tradeoff:
          'Required atomic signal flags and non-blocking waitpid calls, ensuring terminals are never left in unreadable raw states.',
      },
    ],
    whatBroke: {
      incident:
        'Rapidly skipping episodes spawned zombie MPV processes that exhausted Linux process table (`PID limit reached`).',
      errorTraceback: `[CRITICAL] fork: Resource temporarily unavailable (errno 11)
Failed to spawn media player: pipe creation failed.
Process table: 1024 defunct 'mpv' processes detected.`,
      rootCause:
        'The parent process neglected to register a `SIGCHLD` handler or poll `waitpid(-1, &status, WNOHANG)`, leaving terminated children in zombie status.',
      fix:
        'Implemented an asynchronous `SIGCHLD` signal handler with a drain loop `while (waitpid(-1, nullptr, WNOHANG) > 0)` and safe pipe closure.',
    },
    retrospective:
      'Should have separated the video extractor backends into modular dynamic libraries (.so / .dll) for hot-patching when streaming sites update their obfuscation.',
    techStack: ['C++20', 'libcurl', 'POSIX termios', 'CMake', 'Arch / Omarchy Linux'],
    metrics: [
      { label: 'Binary Footprint', value: '380 KB' },
      { label: 'Startup Time', value: '< 6ms' },
      { label: 'Memory Footprint', value: '7.8 MB RSS' },
    ],
  },

  shedskin: {
    id: 'shedskin',
    title: 'SHEDSKIN — Metroidvania in Unity 6',
    shortDesc: '2D Metroidvania with a custom 16-ray kinematic physics solver and skin-shedding decoy mechanics.',
    typeTag: 'GAME // UNITY 6',
    repoUrl: 'https://github.com/iTsukiyomi/peakclover',
    demoUrl: 'https://github.com/iTsukiyomi/platformer',
    problem:
      'Unity default Rigidbody2D physics feels floaty for fast platformers. I built a deterministic 16-ray kinematic controller with variable jump height, coyote time, and a skin-shedding mechanic where the player sheds their exoskeleton as a decoy to dodge damage.',
    architectureDiagramSvg: `<svg viewBox="0 0 720 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; max-width: 700px; display: block; margin: 0 auto;">
  <rect width="720" height="180" fill="transparent"/>
  <!-- Controller Pipeline -->
  <rect x="20" y="45" width="130" height="65" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="85" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">INPUT BUFFER</text>
  <text x="85" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">120ms Queue</text>

  <line x1="150" y1="77" x2="190" y2="77" stroke="var(--border)" stroke-width="2"/>

  <rect x="190" y="45" width="150" height="65" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="265" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">RAYCAST SOLVER</text>
  <text x="265" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">16 Probe Rays</text>

  <line x1="340" y1="77" x2="380" y2="77" stroke="var(--border)" stroke-width="2"/>

  <rect x="380" y="45" width="160" height="65" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="460" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">STATE MACHINE</text>
  <text x="460" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Grounded / Air / Shedding</text>

  <line x1="540" y1="77" x2="580" y2="77" stroke="var(--border)" stroke-width="2"/>

  <rect x="580" y="45" width="120" height="65" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
  <text x="640" y="72" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">2D URP RENDER</text>
  <text x="640" y="92" fill="var(--ink-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">Normal Maps + Bloom</text>
</svg>`,
    architectureNotes: [
      'Kinematic raycast character controller evaluates 16 vertical and horizontal collision rays per frame.',
      'Exoskeleton Decoy entity preserves momentum vectors at moment of shedding, drawing enemy aggro for 2.4 seconds.',
      'Universal Render Pipeline 2D pipeline utilizes normal-mapped pixel art tilesets with volumetric spot-lights.',
    ],
    hardestDecisions: [
      {
        title: 'Custom Kinematic Raycast Solver vs Unity Rigidbody2D',
        decision:
          'Bypassed PhysX entirely for player movement; calculating exact sub-pixel ray penetration depths manually.',
        tradeoff:
          'Required hand-coding one-way platform drop logic and moving platform velocity inheritance, but gained 100% deterministic jump curves.',
      },
      {
        title: 'Camera Spring Decoupling During Skin Shedding',
        decision:
          'Implemented a dual-target Cinemachine virtual camera that interpolates between the shed husk and player core before snapping to the nimble unarmored avatar.',
        tradeoff:
          'Complex camera blending math, but prevented sudden disorienting screen jerks during high-speed combat.',
      },
      {
        title: 'ScriptableObject Event Architecture for Ability Unlocks',
        decision:
          'Used decoupled ScriptableObject event channels for double-jump, dash, and venom-spit ability progression.',
        tradeoff:
          'Requires creating SO assets in project view, but decoupled ability progression from scene reloading and checkpoint resets.',
      },
    ],
    whatBroke: {
      incident:
        'Player clipped through one-way platforms and fell into the abyss when dropping down at high monitor refresh rates (144Hz - 240Hz).',
      errorTraceback: `NullReferenceException: Object reference not set to an instance of an object
  at PlayerController2D.CheckPlatformPassThrough () [0x00042] in RaycastController.cs:189
  at PlayerController2D.FixedUpdate () in PlayerController.cs:84
[PHYSICS] Velocity.y exceeded max terminal threshold: -48.2 (falling through collider)`,
      rootCause:
        'Raycast origin was evaluated before position delta integration, causing rays to start inside the platform collider at small deltaTimes.',
      fix:
        'Applied skin width offset margin (0.015f) to ray origins and added a continuous speculative swept-box check for fast-moving downward velocities.',
    },
    retrospective:
      'Should have planned the boss encounter state transitions with visual state charts earlier; refactoring boss phase logic near the deadline was high-stress.',
    techStack: ['Unity 6', 'C#', '2D URP', 'Cinemachine', 'Custom Kinematic Physics'],
    metrics: [
      { label: 'Input Latency', value: '1 frame (8.3ms)' },
      { label: 'Target Framerate', value: 'Locked 120 FPS' },
      { label: 'Controller Rays', value: '16 per frame' },
    ],
  },

  next: {
    id: 'next',
    title: 'next.txt — What I Am Building Next',
    shortDesc: 'Systems programming research into bytecode virtual machines, C++ compiler frontend, and high-performance game architectures.',
    typeTag: 'R&D // COMPILERS // VM',
    repoUrl: 'https://github.com/iTsukiyomi',
    problem:
      'Exploring lower-level systems architecture: understanding bytecode virtual machines, register allocation algorithms, and deterministic multiplayer game rollbacks from first principles.',
    architectureDiagramSvg: `<svg viewBox="0 0 720 140" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto; max-width: 700px; display: block; margin: 0 auto;">
  <rect width="720" height="140" fill="transparent"/>
  <rect x="30" y="30" width="190" height="60" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="125" y="65" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">BYTECODE VM</text>
  <line x1="220" y1="60" x2="270" y2="60" stroke="var(--border)" stroke-width="2"/>

  <rect x="270" y="30" width="190" height="60" fill="var(--surface)" stroke="var(--border)" stroke-width="2"/>
  <text x="365" y="65" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">C++ COMPILER FRONTEND</text>
  <line x1="460" y1="60" x2="510" y2="60" stroke="var(--border)" stroke-width="2"/>

  <rect x="510" y="30" width="180" height="60" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>
  <text x="600" y="65" fill="var(--ink)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">ROLLBACK NETCODE</text>
</svg>`,
    architectureNotes: [
      'TODO(meet): Documenting register allocation benchmarks against LLVM IR.',
      'TODO(meet): Architecture design for peer-to-peer deterministic lockstep engine.',
    ],
    hardestDecisions: [
      {
        title: 'Stack-based vs Register-based Bytecode',
        decision: 'TODO(meet): Benchmarking interpreter loop dispatch overhead.',
        tradeoff: 'Register-based requires fewer instructions but more complex decoding logic.',
      },
    ],
    whatBroke: {
      incident: 'TODO(meet): Documenting upcoming prototype benchmarks.',
      errorTraceback: '[LOG] Prototype in active development. Benchmarks pending.',
      rootCause: 'Under active research.',
      fix: 'Iterating on prototype implementations.',
    },
    retrospective: 'TODO(meet): Write post-mortem when compiler exploration is published.',
    techStack: ['C++23', 'LLVM', 'Linux Systems', 'Asm'],
    metrics: [
      { label: 'Status', value: 'In Design' },
      { label: 'Target Spec', value: '64-bit VM' },
    ],
  },
};

export const PROFILE_DATA = {
  name: 'Meet Rathod',
  handles: {
    github: 'iTsukiyomi',
    alias: 'Gojo',
    discord: 'iTsukiyomi',
  },
  title: 'Systems & Bot Engineer // BSc IT Student',
  status: 'FIRST-YEAR BSC IT // LINUX (OMARCHY) // BUILDING FINISHED SOFTWARE',
  bio: [
    'I build tools and engines that live in terminals, Discord servers, and game loops. First-year BSc IT student focusing on systems programming in C++, asynchronous Python bot architectures, and game physics.',
    'I run Arch Linux on an Omarchy-configured Hyprland setup. I do not build superficial landing page templates or showcase unfinished weekend hacks. Every project here shipped with full CI/CD, handled real concurrent traffic, and broke in real ways before being stabilized.',
  ],
  links: {
    github: 'https://github.com/iTsukiyomi',
    linkedin: 'https://www.linkedin.com/in/meet-rathod-a1326a448/',
    email: 'meetr459@gmail.com',
  },
  skills: [
    { category: 'Languages', items: ['C++', 'Python', 'TypeScript', 'C#', 'C', 'SQL'] },
    { category: 'Systems & Tools', items: ['Arch Linux', 'Omarchy', 'CMake', 'Neovim', 'Git', 'POSIX VT100'] },
    { category: 'Engines & Frameworks', items: ['Unity 6 (2D URP)', 'FastAPI', 'discord.py', 'asyncio', 'React 19', 'Vite'] },
    { category: 'Data & Databases', items: ['MongoDB', 'PostgreSQL', 'Redis', 'SQLite'] },
  ],
  colophon: {
    typography: 'Cabinet Grotesk (Indian Type Foundry / Fontshare) + Martian Mono (Evil Martians)',
    stack: 'Vite 8, React 19, TypeScript 6, GSAP 3 (ScrollTrigger, Draggable, Flip, SplitText), Lenis',
    principles: '100% self-hosted assets, zero Tailwind, zero component libraries, zero layout-shift animations, 95+ a11y score',
  },
};
