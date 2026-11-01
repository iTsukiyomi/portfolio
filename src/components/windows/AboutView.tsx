import React from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';

export const AboutView: React.FC = () => {
  return (
    <div className="about-editorial-spread" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Editorial Masthead Bar */}
      <div
        style={{
          borderBottom: '2px solid var(--border)',
          paddingBottom: 14,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              fontWeight: 700,
              background: 'var(--ink)',
              color: 'var(--surface)',
              padding: '2px 8px',
              display: 'inline-block',
              marginBottom: 6,
            }}
          >
            AUTHOR PROFILE // DOSSIER
          </span>
          <h2 style={{ fontSize: 'var(--text-h1)', lineHeight: 0.95 }}>
            MEET RATHOD
          </h2>
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textAlign: 'right' }}>
          <div>HANDLES: Gojo / iTsukiyomi</div>
          <div style={{ color: 'var(--ink-muted)' }}>LOC: MUMBAI, INDIA [UTC+5:30]</div>
        </div>
      </div>

      {/* 2-Column Editorial Spread with Drop Cap and Margin Notes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
          gap: 28,
        }}
        className="about-grid-columns"
      >
        {/* Left Column: Narrative with Drop Cap */}
        <div>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.65,
              marginBottom: 18,
            }}
          >
            <span
              style={{
                float: 'left',
                fontSize: 64,
                lineHeight: 0.8,
                paddingRight: 10,
                paddingTop: 4,
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                color: 'var(--accent)',
              }}
            >
              I
            </span>
            build tools and engines that run in terminals, Discord servers, and game loops. I'm a first-year BSc IT student focusing on systems programming in C++, asynchronous Python bot architectures, and custom physics controllers in game engines.
          </p>

          <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 18 }}>
            My daily driver is Arch Linux configured via Omarchy with Hyprland and Neovim. I don't build generic SaaS dashboards or copy-paste template portfolios. If code doesn't survive concurrency race conditions, memory leaks, and network timeouts under real load, it hasn't earned its place in a repository.
          </p>

          {/* Pull Quote */}
          <blockquote
            style={{
              borderLeft: '4px solid var(--accent)',
              padding: '12px 18px',
              margin: '20px 0',
              background: 'var(--surface-alt)',
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 800,
              lineHeight: 1.3,
            }}
          >
            "Real software is defined by its edge cases and recovery loops, not its happy-path marketing copy."
          </blockquote>

          <p style={{ fontSize: 15, lineHeight: 1.6 }}>
            Outside of coding, I'm deeply into anime, video editing, and exploring the mechanics of emulator cores and compiler design.
          </p>
        </div>

        {/* Right Column: Deliberate Off-Grid Workspace Card & Gutter Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Deliberate Imperfection 3: Asymmetrical Architecture Schematic Bleed */}
          <div
            style={{
              border: '2px solid var(--border)',
              background: 'var(--bg)',
              padding: 16,
              boxShadow: '4px 4px 0 var(--border)',
              position: 'relative',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                color: 'var(--accent)',
                marginBottom: 6,
              }}
            >
              [HARDWARE // RIG SCHEMATIC]
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.5 }}>
              <div>OS: Linux 7.2.5 Omarchy (Arch Base)</div>
              <div>WM: Hyprland Wayland Compositor</div>
              <div>EDITOR: Neovim / Lua config</div>
              <div>SHELL: zsh + tmux + custom prompt</div>
              <div>TOOLCHAIN: Clang / GCC / uv / Node 22</div>
            </div>
          </div>

          {/* Gutter Margin Note */}
          <aside
            style={{
              borderLeft: '2px solid var(--ink-muted)',
              paddingLeft: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--ink-muted)',
              lineHeight: 1.45,
            }}
          >
            <strong>ASIDE // PROOF:</strong> All four core projects (Pokémon Duel, Mafioso, ani-cli C++, SHEDSKIN) were built, compiled, and tested locally on this Omarchy environment.
          </aside>

          {/* Skills Breakdown */}
          <div
            style={{
              border: '1px solid var(--border)',
              background: 'var(--surface-alt)',
              padding: 16,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                fontWeight: 800,
                marginBottom: 10,
                borderBottom: '1px solid var(--border)',
                paddingBottom: 4,
              }}
            >
              TECHNICAL CAPABILITIES
            </div>

            {PROFILE_DATA.skills.map((s, idx) => (
              <div key={idx} style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-muted)', fontWeight: 700 }}>
                  {s.category.toUpperCase()}
                </div>
                <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 3 }}>
                  {s.items.map((it, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        padding: '1px 6px',
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Colophon */}
      <footer
        style={{
          borderTop: '2px solid var(--border)',
          paddingTop: 16,
          marginTop: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
        }}
      >
        <div>
          <strong>TYPOGRAPHY</strong>
          <div style={{ color: 'var(--ink-muted)', marginTop: 4 }}>
            {PROFILE_DATA.colophon.typography}
          </div>
        </div>
        <div>
          <strong>STACK</strong>
          <div style={{ color: 'var(--ink-muted)', marginTop: 4 }}>
            {PROFILE_DATA.colophon.stack}
          </div>
        </div>
        <div>
          <strong>STANDARDS</strong>
          <div style={{ color: 'var(--ink-muted)', marginTop: 4 }}>
            {PROFILE_DATA.colophon.principles}
          </div>
        </div>
      </footer>
    </div>
  );
};
