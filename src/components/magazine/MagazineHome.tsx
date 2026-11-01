import React, { useRef, useEffect } from 'react';
import { useWindowManager } from '../../context/WindowManagerContext';
import { PROJECTS_DATA } from '../../data/portfolioData';
import { gsap } from '../../lib/motion';

export const MagazineHome: React.FC = () => {
  const { openWindow } = useWindowManager();
  const rasterBarRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // The Single Hero Moment: The Printing Press Raster Sweep on initial mount
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const bar = rasterBarRef.current;
    const headline = headlineRef.current;
    if (!bar || !headline) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Bar sweeps across the headline box
      tl.set(bar, { left: '0%', opacity: 1 })
        .fromTo(
          bar,
          { left: '0%' },
          {
            left: '100%',
            duration: 1.1,
            ease: 'power2.inOut',
          }
        )
        .to(bar, { opacity: 0, duration: 0.3 });

      // Headline ink impression stamps in with high contrast
      tl.fromTo(
        headline,
        { opacity: 0.1, filter: 'contrast(0.7)' },
        { opacity: 1, filter: 'contrast(1)', duration: 0.8, ease: 'power3.out' },
        '-=0.9'
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="magazine-container" id="main-content" tabIndex={-1}>
      {/* Editorial Masthead */}
      <section className="magazine-masthead" aria-label="Magazine Masthead">
        {/* Deliberate Imperfection 1: Misaligned Rubber Stamp */}
        <div className="stamp-badge-imperfect" aria-hidden="true">
          ISSUE #01 // NOV 2026
        </div>

        <div className="masthead-top-rule">
          <span>RATHOD TECHNICAL JOURNAL</span>
          <span>VOLUME 01 : SYSTEMS &amp; ENGINES</span>
          <span>LOC: ARCH LINUX / OMARCHY</span>
        </div>

        <div className="masthead-hero-content">
          <div ref={rasterBarRef} className="print-raster-bar" aria-hidden="true" />

          <h1 ref={headlineRef} className="masthead-title-block">
            MEET RATHOD
            <br />
            <span style={{ color: 'var(--accent)' }}>// REAL SYSTEMS</span>
          </h1>

          <p style={{ fontSize: 'var(--text-h2)', fontWeight: 700, lineHeight: 1.3, maxWidth: '52ch', marginBottom: 20 }}>
            I don't write boilerplate SaaS wrappers. I engineer turn-based battle engines with priority queues, C++20 media tools with raw VT100 escapes, and deterministic Metroidvania controllers.
          </p>

          <div className="masthead-subtitle-strip">
            <span>[FIRST-YEAR BSC IT]</span>
            <span>•</span>
            <span>[LINUX KERNEL 7.2]</span>
            <span>•</span>
            <span>[DISCORD BOT ARCHITECTURE]</span>
            <span>•</span>
            <span style={{ color: 'var(--accent)' }}>[SOURCE &amp; SCARS INCLUDED]</span>
          </div>
        </div>
      </section>

      {/* Editorial Articles / Projects Overview */}
      <section className="editorial-sections-wrapper" aria-label="Engineering Projects">
        <div>
          <div className="editorial-section-header">
            <h2 className="editorial-section-title">ENGINEERING ARTICLES</h2>
            <span className="editorial-section-tag">
              DOUBLE-CLICK ICONS OR USE BUTTONS TO LAUNCH DRAGGABLE WINDOWS
            </span>
          </div>

          <div className="project-articles-grid">
            {/* Article 1: Pokémon Duel (Large) */}
            <article className="project-card-large">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
                    01 // ASYNCIO BATTLE SIMULATOR
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                    PYTHON 3.12 / FASTAPI
                  </span>
                </div>

                <h3 style={{ fontSize: 'var(--text-h2)', marginBottom: 12 }}>
                  {PROJECTS_DATA.dueler.title}
                </h3>

                <p style={{ marginBottom: 16 }}>
                  {PROJECTS_DATA.dueler.problem}
                </p>

                <div
                  style={{
                    background: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    marginBottom: 20,
                  }}
                >
                  <div>[ARCHITECTURE SNAPSHOT]</div>
                  <div>• Functional Turn Evaluation returning deep-copied BattleSnapshot</div>
                  <div>• Heuristic Minimax AI with 2-ply horizon under 450ms</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="dock-item-btn active"
                  onClick={() => openWindow('dueler')}
                  aria-label="Open Pokémon Duel full case study window"
                >
                  [READ CASE STUDY WINDOW &amp; ARCHITECTURE]
                </button>
                <a
                  href={PROJECTS_DATA.dueler.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}
                >
                  GitHub Source ↗
                </a>
              </div>
            </article>

            {/* Article 2: ani-cli.cpp (Aside) */}
            <article className="project-card-aside">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
                    02 // NATIVE STREAMER
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                    C++20 / POSIX
                  </span>
                </div>

                <h3 style={{ fontSize: 'var(--text-h2)', marginBottom: 12 }}>
                  {PROJECTS_DATA['ani-cpp'].title}
                </h3>

                <p style={{ marginBottom: 16, fontSize: 14 }}>
                  Zero-dependency native C++20 compiled binary with custom VT100 ANSI terminal escape interface and automated process reaper.
                </p>

                <div
                  style={{
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    marginBottom: 20,
                  }}
                >
                  <div>FOOTPRINT: 380 KB</div>
                  <div>STARTUP: &lt; 6ms</div>
                  <div>MEMORY: 7.8 MB RSS</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="dock-item-btn"
                  onClick={() => openWindow('ani-cpp')}
                  aria-label="Open ani-cli C++ full case study window"
                >
                  [OPEN WINDOW]
                </button>
                <a
                  href={PROJECTS_DATA['ani-cpp'].repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}
                >
                  GitHub Source ↗
                </a>
              </div>
            </article>

            {/* Article 3: Mafioso (Aside) */}
            <article className="project-card-aside">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
                    03 // HIDDEN ROLE FSM
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                    PYTHON / MONGODB
                  </span>
                </div>

                <h3 style={{ fontSize: 'var(--text-h2)', marginBottom: 12 }}>
                  {PROJECTS_DATA.mafioso.title}
                </h3>

                <p style={{ marginBottom: 16, fontSize: 14 }}>
                  Authoritative multi-phase finite state machine orchestrating 12+ player hidden role matches with atomic Redis vote tally CAS locks.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="dock-item-btn"
                  onClick={() => openWindow('mafioso')}
                  aria-label="Open Mafioso full case study window"
                >
                  [OPEN WINDOW]
                </button>
                <a
                  href={PROJECTS_DATA.mafioso.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}
                >
                  GitHub Source ↗
                </a>
              </div>
            </article>

            {/* Article 4: SHEDSKIN (Large) */}
            <article className="project-card-large">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>
                    04 // METROIDVANIA
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
                    UNITY 6 / 2D URP
                  </span>
                </div>

                <h3 style={{ fontSize: 'var(--text-h2)', marginBottom: 12 }}>
                  {PROJECTS_DATA.shedskin.title}
                </h3>

                <p style={{ marginBottom: 16 }}>
                  {PROJECTS_DATA.shedskin.problem}
                </p>

                <div
                  style={{
                    background: 'var(--code-bg)',
                    border: '1px solid var(--border)',
                    padding: '8px 12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    marginBottom: 20,
                  }}
                >
                  <div>[PHYSICS IMPLEMENTATION]</div>
                  <div>• 16-ray custom kinematic collision solver with sub-pixel penetration compensation</div>
                  <div>• Skin-shedding decoy husk drawing enemy aggro with dual-target camera damping</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className="dock-item-btn active"
                  onClick={() => openWindow('shedskin')}
                  aria-label="Open SHEDSKIN full case study window"
                >
                  [READ CASE STUDY WINDOW &amp; ARCHITECTURE]
                </button>
                <a
                  href={PROJECTS_DATA.shedskin.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700 }}
                >
                  GitHub Source ↗
                </a>
              </div>
            </article>
          </div>
        </div>

        {/* Editorial About Section */}
        <section aria-label="Editorial Spread About Meet Rathod">
          <div className="editorial-section-header">
            <h2 className="editorial-section-title">DOSSIER &amp; ETHOS</h2>
            <button
              type="button"
              className="dock-item-btn"
              onClick={() => openWindow('about')}
              aria-label="Open About window"
            >
              [DETACH ABOUT WINDOW]
            </button>
          </div>

          <div
            style={{
              border: '2px solid var(--border)',
              background: 'var(--surface)',
              boxShadow: 'var(--shadow-md)',
              padding: 32,
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
              gap: 32,
            }}
            className="about-grid-columns"
          >
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.65, marginBottom: 16 }}>
                <span
                  style={{
                    float: 'left',
                    fontSize: 54,
                    lineHeight: 0.8,
                    paddingRight: 8,
                    paddingTop: 4,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    color: 'var(--accent)',
                  }}
                >
                  M
                </span>
                eet Rathod (Gojo / iTsukiyomi). First-year BSc Information Technology student. I spend my time building software where performance, concurrency, and architecture cannot be faked behind nice CSS.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                Every project on this page was written from scratch on Arch Linux using Omarchy and Neovim. I value finished, tested tools over half-baked concepts.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button
                  type="button"
                  className="dock-item-btn active"
                  onClick={() => openWindow('contact')}
                >
                  [OPEN CONTACT.SH SHELL]
                </button>
                <button
                  type="button"
                  className="dock-item-btn"
                  onClick={() => openWindow('resume')}
                >
                  [INSPECT RESUME.PDF]
                </button>
              </div>
            </div>

            <div style={{ borderLeft: '2px solid var(--border)', paddingLeft: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', marginBottom: 8 }}>
                [ENVIRONMENT &amp; STACK]
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6 }}>
                <div>• Daily Driver: Linux Omarchy (Kernel 7.2)</div>
                <div>• Compositor: Hyprland Wayland</div>
                <div>• Core Languages: C++20, Python 3.12, TypeScript</div>
                <div>• Engine: Unity 6 (2D URP)</div>
                <div>• Handles: iTsukiyomi (GitHub), Gojo (Discord)</div>
                <div>• Contact: meetr459@gmail.com</div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};
