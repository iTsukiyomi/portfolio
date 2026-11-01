import React from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';

export const AboutPageView: React.FC = () => {
  return (
    <div className="page-container">
      <div style={{ marginBottom: 32 }}>
        <span className="pill-badge">PROFILE &amp; BACKGROUND</span>
        <h1 className="section-title">ABOUT ME</h1>
        <p className="section-subtitle">
          Background, technical motivations, daily developer toolchain, and interests.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)', gap: 32 }} className="about-responsive-grid">
        {/* Left Column: Personal Narrative */}
        <div className="content-card" style={{ marginBottom: 0 }}>
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: 16 }}>
            MEET RATHOD
          </h2>

          <div style={{ fontSize: 14, lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p>
              I am a first-year B.Sc Information Technology student at <strong>Jai Hind College, Mumbai</strong>. My handles online are <strong>Gojo</strong> and <strong>iTsukiyomi</strong>.
            </p>
            <p>
              I build software where concurrency, performance, and architecture matter. Instead of surface-level tutorials, I like taking on projects that have real technical friction: writing a turn-based Pokémon battle engine that runs under strict Discord latency deadlines, porting ani-cli to native C++20 with an ANSI VT100 interface, and building raycast-based kinematic physics controllers in Unity 6.
            </p>
            <p>
              I run <strong>Arch Linux</strong> on an <strong>Omarchy</strong> Hyprland configuration. Working in Linux has taught me to care about how processes, memory, and compilers actually operate under the hood.
            </p>
            <p>
              When I am not writing code, I enjoy anime, video editing, learning 3D rendering, and hanging out with fellow builders at <strong>DotComClub (DCC)</strong>.
            </p>
          </div>
        </div>

        {/* Right Column: Daily Toolchain & Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Workstation Rig Card */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">DEVELOPER ENVIRONMENT</span>
            <h3 style={{ fontSize: 16, marginTop: 6, marginBottom: 12 }}>DAILY RIG &amp; TOOLCHAIN</h3>

            <div style={{ fontSize: 12, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div><strong>Operating System:</strong> Arch Linux (Omarchy 7.2)</div>
              <div><strong>Window Manager:</strong> Hyprland (Wayland)</div>
              <div><strong>Code Editors:</strong> Neovim &amp; VS Code</div>
              <div><strong>Terminal:</strong> foot / alacritty (VT100)</div>
              <div><strong>Tooling:</strong> CMake, uv, Git, GCC/Clang</div>
              <div><strong>Hardware:</strong> AMD Ryzen 7 @ 4.2GHz, 16GB RAM</div>
            </div>
          </div>

          {/* Technical Skills Overview */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">CAPABILITIES</span>
            <h3 style={{ fontSize: 16, marginTop: 6, marginBottom: 12 }}>SKILLS AT A GLANCE</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
              {PROFILE_DATA.skills.map((s, idx) => (
                <div key={idx}>
                  <div style={{ color: 'var(--ink-muted)', fontWeight: 700, fontSize: 11 }}>
                    {s.category.toUpperCase()}
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                    {s.items.map((item, i) => (
                      <span key={i} className="pill-badge" style={{ marginBottom: 0 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
