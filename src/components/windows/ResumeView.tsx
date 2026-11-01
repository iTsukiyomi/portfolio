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
          DOCUMENT: MEET_RATHOD_ENGINEERING_RESUME.PDF
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
            Systems, Bot Architecture & Game Dev • Mumbai, India
          </div>
          <div style={{ fontSize: 12, marginTop: 4 }}>
            Email: <a href="mailto:meetr459@gmail.com">meetr459@gmail.com</a> | GitHub: <a href="https://github.com/iTsukiyomi" target="_blank" rel="noreferrer">github.com/iTsukiyomi</a> | LinkedIn: <a href="https://www.linkedin.com/in/meet-rathod-a1326a448/" target="_blank" rel="noreferrer">in/meet-rathod</a>
          </div>
        </div>

        {/* Education */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            EDUCATION
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <strong>Bachelor of Science in Information Technology (BSc IT)</strong>
            <span>2024 — Present (First Year)</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>
            Coursework: Data Structures, Computer Architecture, Database Management, Object Oriented Programming.
          </div>
        </section>

        {/* Technical Experience & Projects */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            CORE TECHNICAL PROJECTS
          </h2>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>Pokémon Duel (dueler / pypoke) — Async Battle Engine</strong>
              <span>Python 3.12, asyncio, discord.py, FastAPI</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>
              <li>Engineered an asynchronous, turn-based battle engine with speed bracket priority and stat-stage mechanics.</li>
              <li>Built heuristic minimax AI evaluating switch predictions within a 450ms Discord interaction deadline.</li>
              <li>Created FastAPI web companion with HMAC token authorization for instant team preset imports.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>ani-cli C++ Port (ani-cpp) — Native Media Streaming TUI</strong>
              <span>C++20, libcurl, POSIX VT100, CMake</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>
              <li>Replaced shell script dependency chain with a zero-dependency 380 KB compiled C++20 binary.</li>
              <li>Engineered custom ANSI terminal escape UI with non-blocking POSIX signal handling and process reaper.</li>
              <li>Built automated GitHub Actions CI/CD matrix releasing multi-platform binaries.</li>
            </ul>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>Mafioso (mafia-assistant) — Discord Social Deduction Bot</strong>
              <span>Python, MongoDB, Redis, discord.py</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>
              <li>Architected a multi-phase finite state machine orchestrating 12+ player hidden role matches.</li>
              <li>Implemented atomic CAS voting tally locks in Redis to prevent race conditions during vote hammer.</li>
            </ul>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
              <strong>SHEDSKIN (peakclover) — Unity 6 Metroidvania</strong>
              <span>Unity 6, C#, 2D URP, Custom Kinematics</span>
            </div>
            <ul style={{ paddingLeft: 18, fontSize: 11, marginTop: 4, lineHeight: 1.4 }}>
              <li>Engineered a 16-ray kinematic raycast character controller for deterministic platformer physics.</li>
              <li>Built exoskeleton skin-shedding decoy mechanics with spring-damped camera interpolation.</li>
            </ul>
          </div>
        </section>

        {/* Technical Skills */}
        <section>
          <h2 style={{ fontSize: 13, fontWeight: 900, borderBottom: '1px solid var(--border)', paddingBottom: 2, marginBottom: 8 }}>
            TECHNICAL SKILLS
          </h2>
          <div style={{ fontSize: 11, lineHeight: 1.6 }}>
            <div><strong>Languages:</strong> C++, Python, TypeScript, C#, C, SQL, Bash</div>
            <div><strong>Systems & OS:</strong> Arch Linux / Omarchy, POSIX VT100, CMake, Neovim, Git, uv</div>
            <div><strong>Frameworks:</strong> Unity 6 (2D URP), FastAPI, discord.py, React 19, Vite, GSAP</div>
            <div><strong>Databases:</strong> MongoDB, PostgreSQL, Redis, SQLite</div>
          </div>
        </section>
      </div>
    </div>
  );
};
