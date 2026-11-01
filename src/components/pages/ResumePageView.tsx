import React from 'react';

export const ResumePageView: React.FC = () => {
  return (
    <div className="page-container">
      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <span className="pill-badge">FORMAL CURRICULUM VITAE</span>
          <h1 className="section-title" style={{ marginBottom: 4 }}>RESUME</h1>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="btn-primary"
        >
          Print / Save PDF ↗
        </button>
      </div>

      {/* Printable Resume Container */}
      <div className="content-card" style={{ padding: '36px 40px' }}>
        {/* Resume Header */}
        <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: 18, marginBottom: 20 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
            MEET RATHOD
          </h2>
          <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>
            F.Y. B.Sc Information Technology Student • Jai Hind College, Mumbai
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, marginTop: 8 }}>
            <span>Email: <a href="mailto:meetr459@gmail.com">meetr459@gmail.com</a></span>
            <span>Discord: <strong>kaizen__009</strong></span>
            <span>GitHub: <a href="https://github.com/iTsukiyomi" target="_blank" rel="noreferrer">github.com/iTsukiyomi</a></span>
            <span>LinkedIn: <a href="https://www.linkedin.com/in/meet-rathod-a1326a448/" target="_blank" rel="noreferrer">in/meet-rathod</a></span>
          </div>
        </div>

        {/* Objective */}
        <section style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, borderLeft: '3px solid var(--accent)', paddingLeft: 10, marginBottom: 8 }}>
            OBJECTIVE
          </h3>
          <p style={{ fontSize: 12.5, lineHeight: 1.65 }}>
            First-year student of B.Sc IT looking to build a strong foundation in Python, C++, web development, and systems programming, eager to apply my skills through academic and personal software projects.
          </p>
        </section>

        {/* Education */}
        <section style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, borderLeft: '3px solid var(--accent)', paddingLeft: 10, marginBottom: 12 }}>
            EDUCATION
          </h3>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <strong>F.Y. B.Sc Information Technology</strong>
              <span style={{ fontWeight: 700 }}>2026 — 2029</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
              Jai Hind College, Mumbai
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <strong>HSC (12th Standard)</strong>
              <span style={{ fontWeight: 700 }}>2025</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
              Jai Hind Junior College, Mumbai
            </div>
          </div>
        </section>

        {/* Projects */}
        <section style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, borderLeft: '3px solid var(--accent)', paddingLeft: 10, marginBottom: 12 }}>
            TECHNICAL PROJECTS
          </h3>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, flexWrap: 'wrap' }}>
              <strong>Pokémon Duel (pypoke) — Async Battle Engine</strong>
              <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>Python, asyncio, discord.py, FastAPI</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>
              <li>Engineered turn-based battle engine on Discord with priority brackets and physical/special damage split.</li>
              <li>Built heuristic minimax AI evaluating switch predictions within a 450ms Discord interaction deadline.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, flexWrap: 'wrap' }}>
              <strong>MangaDex CLI — Manga Search &amp; Data Analysis</strong>
              <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>Python, FastAPI, Pandas, Matplotlib</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>
              <li>Command line tool to search, compare, and query manga metadata using public APIs.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, flexWrap: 'wrap' }}>
              <strong>ani-cli C++ Port (ani-cpp) — Native Media Streaming TUI</strong>
              <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>C++20, libcurl, POSIX VT100, CMake</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>
              <li>Replaced shell script dependency chain with a zero-dependency 380 KB compiled C++20 binary.</li>
              <li>Engineered custom ANSI terminal escape UI with non-blocking POSIX signal handling and process reaper.</li>
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, flexWrap: 'wrap' }}>
              <strong>SHEDSKIN (peakclover) — Unity 6 Metroidvania</strong>
              <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>Unity 6, C#, 2D URP, Custom Kinematics</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 12, lineHeight: 1.5, marginTop: 4 }}>
              <li>Deterministic 16-ray kinematic raycast character controller with skin-shedding decoy mechanics.</li>
            </ul>
          </div>
        </section>

        {/* Technical Skills & Languages */}
        <section style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, borderLeft: '3px solid var(--accent)', paddingLeft: 10, marginBottom: 10 }}>
            SKILLS &amp; LANGUAGES
          </h3>
          <div style={{ fontSize: 12, lineHeight: 1.7 }}>
            <div><strong>Expertise:</strong> C &amp; C++, Python, HTML &amp; CSS, TypeScript, C#, Linux</div>
            <div><strong>Tools:</strong> VS Code, Git &amp; GitHub, Claude Code, Linux (Omarchy/Arch), CMake, uv</div>
            <div><strong>Spoken Languages:</strong> English (Fluent), French (Fluent), Hindi (Native)</div>
            <div><strong>Interests:</strong> Coding, Gaming, Video Editing, 3D Rendering</div>
          </div>
        </section>

        {/* Extracurriculars */}
        <section>
          <h3 style={{ fontSize: 13, fontWeight: 800, borderLeft: '3px solid var(--accent)', paddingLeft: 10, marginBottom: 8 }}>
            ACHIEVEMENTS &amp; EXTRACURRICULARS
          </h3>
          <ul style={{ paddingLeft: 18, fontSize: 12, lineHeight: 1.5 }}>
            <li>Completed the official Claude 101 certification.</li>
            <li>Member of DotComClub (DCC) at Jai Hind College.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
