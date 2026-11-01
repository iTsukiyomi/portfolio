import React from 'react';

export const ResumeView: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        fontFamily: 'var(--font-mono)',
        background: 'var(--surface)',
        color: 'var(--ink)',
      }}
    >
      {/* Top Action Bar */}
      <div
        style={{
          borderBottom: '2px solid var(--border)',
          paddingBottom: 12,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 800 }}>
          DOCUMENT: MEET_RATHOD_RESUME.PDF
        </span>
        <button
          onClick={() => window.print()}
          style={{
            border: '2px solid var(--border)',
            background: 'var(--accent)',
            color: 'var(--accent-contrast)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 800,
            padding: '4px 12px',
            cursor: 'pointer',
            boxShadow: '2px 2px 0 var(--border)',
          }}
        >
          [PRINT / EXPORT TO PDF]
        </button>
      </div>

      {/* Resume Content Sheet */}
      <div
        style={{
          border: '1px solid var(--border)',
          background: 'var(--bg)',
          padding: 24,
          boxShadow: '3px 3px 0 var(--border)',
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: 16, marginBottom: 16 }}>
          <h1 style={{ fontSize: 26, fontFamily: 'var(--font-display)', fontWeight: 900, marginBottom: 4 }}>
            MEET RATHOD
          </h1>
          <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
            F.Y. B.Sc IT Student • Jai Hind College • Mumbai, India
          </div>
          <div style={{ fontSize: 12, marginTop: 4, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span>Email: <a href="mailto:meetr459@gmail.com">meetr459@gmail.com</a></span>
            <span>Phone: <a href="tel:8591424976">+91 8591424976</a></span>
            <span>GitHub: <a href="https://github.com/iTsukiyomi" target="_blank" rel="noreferrer">github.com/iTsukiyomi</a></span>
            <span>LinkedIn: <a href="https://www.linkedin.com/in/meet-rathod-a1326a448/" target="_blank" rel="noreferrer">in/meet-rathod</a></span>
          </div>
        </div>

        {/* Objective */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            OBJECTIVE
          </h2>
          <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--ink)' }}>
            First-year student of B.Sc IT looking to build a strong foundation in Python, C++, web development, and systems programming, eager to apply skills through academic and personal software projects.
          </p>
        </section>

        {/* Education */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            EDUCATION
          </h2>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>F.Y. B.Sc Information Technology</strong>
              <span>2026 — 2029</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>
              Jai Hind College, Mumbai
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>HSC (12th Standard)</strong>
              <span>2025</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>
              Jai Hind Junior College, Mumbai
            </div>
          </div>
        </section>

        {/* Technical Experience & Projects */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            PROJECTS &amp; SYSTEMS
          </h2>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>Pokémon Duel (dueler / pypoke) — Async Battle Engine</strong>
              <span>Python, asyncio, discord.py, FastAPI</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
              <li>Engineered turn-based Pokémon battle engine with priority brackets, damage calculations, and stat stages.</li>
              <li>Built heuristic minimax AI evaluating switch predictions within a 450ms Discord interaction deadline.</li>
              <li>Created FastAPI web companion with HMAC token authorization for team preset imports.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>MangaDex CLI — Terminal Manga Exploration Tool</strong>
              <span>Python, FastAPI, Pandas, Matplotlib</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
              <li>Built a command line tool to search, compare, and get information on manga using public APIs.</li>
              <li>Integrated data analysis and visualization pipelines with Pandas and Matplotlib.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>ani-cli C++ Port (ani-cpp) — Native Media Streaming TUI</strong>
              <span>C++20, libcurl, POSIX VT100, CMake</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
              <li>Replaced shell script dependency chain with a zero-dependency 380 KB compiled C++20 binary.</li>
              <li>Engineered custom ANSI terminal escape UI with non-blocking POSIX signal handling and process reaper.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>Mafioso (mafia-assistant) — Discord Social Deduction Bot</strong>
              <span>Python, MongoDB, Redis, discord.py</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
              <li>Architected a multi-phase finite state machine orchestrating 12+ player hidden role matches.</li>
              <li>Implemented atomic CAS voting tally locks in Redis to prevent duplicate votes during hammer.</li>
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>SHEDSKIN (peakclover) — Unity 6 Metroidvania</strong>
              <span>Unity 6, C#, 2D URP, Custom Kinematics</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
              <li>Engineered a 16-ray kinematic raycast character controller for deterministic platformer physics.</li>
              <li>Built exoskeleton skin-shedding decoy mechanics with spring-damped camera interpolation.</li>
            </ul>
          </div>
        </section>

        {/* Technical Skills & Languages */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            SKILLS &amp; LANGUAGES
          </h2>
          <div style={{ fontSize: 11, lineHeight: 1.7 }}>
            <div><strong>Expertise:</strong> C &amp; C++, Python, HTML &amp; CSS, TypeScript, C#, Linux</div>
            <div><strong>Tools:</strong> VS Code, Git &amp; GitHub, Claude Code, Linux (Omarchy/Arch), CMake, uv</div>
            <div><strong>Spoken Languages:</strong> English (Fluent), French (Fluent), Hindi (Native)</div>
            <div><strong>Interests:</strong> Systems Coding, Gaming, Video Editing, 3D Rendering</div>
          </div>
        </section>

        {/* Achievements & Activities */}
        <section>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            ACHIEVEMENTS &amp; EXTRACURRICULARS
          </h2>
          <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.5 }}>
            <li>Completed the official Claude 101 certification.</li>
            <li>Active Member of DotComClub (DCC) at Jai Hind College.</li>
            <li>Active open-source contributor and Linux customization enthusiast.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};
