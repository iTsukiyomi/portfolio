import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Pause, Play } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'dueler',
    label: 'Dueler',
    tag: 'Discord Battle Bot',
    lang: 'Python',
    file: 'dueler // battle/battle.py',
    badge: 'asyncio',
    codeLines: [
      { text: '# Wait for both trainers each turn', cls: 'c-dim' },
      { text: 'await trainer1.event.wait()', cls: 'c-acc' },
      { text: 'await trainer2.event.wait()', cls: 'c-acc' },
      { text: 'battle_view.stop()', cls: '' },
    ],
    footerLabel: 'Type chart',
    footerValue: '18 x 18',
    rows: [
      { k: 'Battle loop', v: 'Turn-based' },
      { k: 'Team import', v: 'Showdown' },
      { k: 'Ranking', v: 'Elo K=32' },
    ],
    icons: [
      { src: 'assets/icons/python.svg', w: 40, h: 40 },
      { src: 'assets/icons/discord.svg', w: 40, h: 40 },
      { src: 'assets/icons/sqlite.svg', w: 40, h: 18 },
    ],
  },
  {
    id: 'mafia',
    label: 'Mafioso',
    tag: 'Social Deduction Bot',
    lang: 'Python 3.13',
    file: 'MafiosoStudios/Mafia // game_engine.py',
    badge: 'SQLite',
    codeLines: [
      { text: '# Player state tracked per match', cls: 'c-dim' },
      { text: '@dataclass(slots=True)', cls: 'c-acc' },
      { text: 'class GamePlayerState:', cls: 'c-acc' },
      { text: '  faction: str | None', cls: '' },
    ],
    footerLabel: 'Persistence',
    footerValue: 'aiosqlite',
    rows: [
      { k: 'Factions', v: '3 teams' },
      { k: 'Commands', v: 'Slash + !' },
      { k: 'Progression', v: 'Shop & ranks' },
    ],
    icons: [
      { src: 'assets/icons/discord.svg', w: 40, h: 40 },
      { src: 'assets/icons/python.svg', w: 40, h: 40 },
      { src: 'assets/icons/sqlite.svg', w: 40, h: 18 },
    ],
  },
  {
    id: 'pyredis',
    label: 'PyRedis',
    tag: 'Key-Value Server',
    lang: 'TCP Sockets',
    file: 'iTsukiyomi/PyRedis // server.py',
    badge: 'RESP ready',
    codeLines: [
      { text: '# Non-blocking I/O loop', cls: 'c-dim' },
      { text: 'events = selector.select()', cls: '' },
      { text: 'store.expire_keys()', cls: '' },
      { text: 'for k, _ in events: handle()', cls: 'c-acc' },
    ],
    footerLabel: 'Client',
    footerValue: 'redis-cli',
    rows: [
      { k: 'Commands', v: '11 ops' },
      { k: 'Multiplexing', v: 'selectors' },
      { k: 'Expiry loop', v: '100ms' },
    ],
    icons: [
      { src: 'assets/icons/redis.svg', w: 40, h: 34 },
      { src: 'assets/icons/python.svg', w: 40, h: 40 },
      { src: 'assets/icons/archlinux.svg', w: 40, h: 40 },
    ],
  },
  {
    id: 'fastapi',
    label: 'FastAPI Tools',
    tag: 'APIs & CLI Tools',
    lang: 'Python',
    file: 'iTsukiyomi/fastapi-projects',
    badge: 'FastAPI',
    codeLines: [
      { text: '# pokedex/poke_server.py', cls: 'c-dim' },
      { text: '@app.post("/team")', cls: 'c-acc' },
      { text: 'def add_poke(poke, db):', cls: 'c-acc' },
      { text: '  db.add(poke); db.commit()', cls: '' },
    ],
    footerLabel: 'Storage',
    footerValue: 'SQLAlchemy',
    rows: [
      { k: 'MangaDex CLI', v: 'TenRai API' },
      { k: 'Charts', v: 'Pandas + MPL' },
      { k: 'Pokédex API', v: 'team.db' },
    ],
    icons: [
      { src: 'assets/icons/fastapi.svg', w: 40, h: 40 },
      { src: 'assets/icons/sqlite.svg', w: 40, h: 18 },
      { src: 'assets/icons/github.svg', w: 40, h: 39 },
    ],
  },
];

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hasSystemPause, setHasSystemPause] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const collage = document.querySelector('.ly-collage');
    if (!collage) return;
    const checkPause = () => {
      setHasSystemPause(!!collage.querySelector(':scope > button.loop-pause'));
    };
    checkPause();
    const obs = new MutationObserver(checkPause);
    obs.observe(collage, { childList: true });
    const onDocClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement)?.closest?.('.ly-collage > button.loop-pause');
      if (btn) {
        setPaused(btn.getAttribute('aria-pressed') === 'true');
      }
    };
    document.addEventListener('click', onDocClick);
    return () => {
      obs.disconnect();
      document.removeEventListener('click', onDocClick);
    };
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [paused, reduceMotion]);

  const slide = HERO_SLIDES[index];

  return (
    <section className="hero hero--triptych bg-dots" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="span-3">
            <h1 id="hero-h">Python systems, bots, and APIs</h1>
            <p className="hero__lead">
              I'm Meet Rathod, a first-year BSc IT student building Discord games, a Redis clone in Python, and FastAPI tools.
            </p>
          </div>

          <div
            className="ly-collage span-6 start-4"
            data-fx="gradient-mesh"
            data-fx-seed="42"
            aria-label="Cycling previews of Dueler, Mafioso, PyRedis, and FastAPI Projects"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={slide.id}
                className="ly-collage__set is-on"
                onClick={() => setIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
                style={{ cursor: 'pointer' }}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985, filter: 'blur(2px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.99, filter: 'blur(2px)' }}
                transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="ly-piece pc-code pc-corner-pad" style={{ left: '36%', top: '38%', width: '60%', height: '58%' }}>
                  <div className="pc-card__head">
                    <span>{slide.file}</span>
                    <span className="c-ok">{slide.badge}</span>
                  </div>
                  <div>
                    {slide.codeLines.map((line, i) => (
                      <div key={i} className={line.cls}>{line.text}</div>
                    ))}
                  </div>
                  <div className="pc-card__row">
                    <span>{slide.footerLabel}</span>
                    <span className="pc-card__metric">{slide.footerValue}</span>
                  </div>
                </div>

                <div className="ly-piece pc-card" style={{ left: '4%', top: '6%', width: '52%' }}>
                  <div className="pc-card__head">
                    <span>{slide.tag}</span>
                    <span>{slide.lang}</span>
                  </div>
                  <div className="pc-card__title">{slide.label}</div>
                  {slide.rows.map((r) => (
                    <div key={r.k} className="pc-card__row">
                      <span>{r.k}</span>
                      <span className="pc-card__metric">{r.v}</span>
                    </div>
                  ))}
                </div>

                <div className="ly-piece pc-icons" style={{ left: '60%', top: '10%', width: '36%' }}>
                  {slide.icons.map((ic, i) => (
                    <img key={i} src={ic.src} alt="" width={ic.w} height={ic.h} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide progress indicator + fallback pause control when system.js doesn't mount one */}
            <div className="hero-collage-controls">
              <div className="hero-collage-dots" aria-hidden="true">
                {HERO_SLIDES.map((s, i) => (
                  <span
                    key={s.id}
                    className={`hero-collage-dot ${i === index ? 'is-active' : ''}`}
                  />
                ))}
              </div>
              {!hasSystemPause && (
                <button
                  type="button"
                  className="loop-pause"
                  onClick={() => setPaused((p) => !p)}
                  aria-label={paused ? 'Resume project preview cycle' : 'Pause project preview cycle'}
                  aria-pressed={paused}
                  style={{ position: 'static' }}
                >
                  {paused ? <Play size={12} /> : <Pause size={12} />}
                </button>
              )}
            </div>
          </div>

          <div className="span-3 start-10 hero__cta">
            <a className="btn btn--primary" href="#work">
              Explore work
              <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                <path className="m-arrow__stem" d="M1 6h8" />
                <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
