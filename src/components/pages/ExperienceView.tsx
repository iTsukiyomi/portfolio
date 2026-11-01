import React from 'react';

export const ExperienceView: React.FC = () => {
  return (
    <div className="page-container">
      <div style={{ marginBottom: 32 }}>
        <span className="pill-badge">BACKGROUND &amp; TIMELINE</span>
        <h1 className="section-title">EDUCATION &amp; EXPERIENCE</h1>
        <p className="section-subtitle">
          Academic foundation, independent software development experience, club activities, and language proficiencies.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Education Section */}
        <section className="content-card">
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: 20, borderBottom: '2px solid var(--border)', paddingBottom: 8 }}>
            ACADEMIC EDUCATION
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Degree 1 */}
            <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>F.Y. B.Sc Information Technology</h3>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)' }}>2026 — 2029</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-muted)', marginTop: 2 }}>
                Jai Hind College, Mumbai
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>
                Currently in first year. Focusing on foundational computer science principles: Data Structures &amp; Algorithms, Computer Architecture, Database Management Systems, and Object-Oriented Software Design.
              </p>
            </div>

            {/* Degree 2 */}
            <div style={{ borderLeft: '3px solid var(--border)', paddingLeft: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Higher Secondary Certificate (HSC — 12th)</h3>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)' }}>2025</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-muted)', marginTop: 2 }}>
                Jai Hind Junior College, Mumbai
              </div>
            </div>
          </div>
        </section>

        {/* Practical Experience Section */}
        <section className="content-card">
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: 20, borderBottom: '2px solid var(--border)', paddingBottom: 8 }}>
            PRACTICAL &amp; INDEPENDENT WORK
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 6 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Independent Systems &amp; Bot Developer</h3>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)' }}>2024 — Present</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>
                Architected and deployed production Discord bot engines, native C++ terminal tools, and 2D physics controllers:
              </p>
              <ul style={{ paddingLeft: 20, fontSize: 13, lineHeight: 1.6, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li>Engineered <strong>Pokémon Duel</strong>: an asynchronous battle engine managing priority brackets, switch prediction AI, and FastAPI web synchronization.</li>
                <li>Ported <strong>ani-cli to C++20</strong>: replacing shell script pipelines with a zero-dependency 380 KB compiled binary and POSIX process management.</li>
                <li>Created <strong>Mafioso</strong>: a 12+ player hidden-role game coordinator backed by MongoDB and atomic Redis concurrency locks.</li>
                <li>Built <strong>SHEDSKIN</strong>: an action platformer with a custom 16-ray kinematic physics controller in Unity 6.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Languages & Extracurriculars Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {/* Spoken Languages */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <h2 style={{ fontSize: 18, marginBottom: 14, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
              SPOKEN LANGUAGES
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: 4 }}>
                <span>English</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Fluent</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-subtle)', paddingBottom: 4 }}>
                <span>French</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Fluent</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Hindi</span>
                <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Native</span>
              </div>
            </div>
          </div>

          {/* Extracurriculars & Clubs */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <h2 style={{ fontSize: 18, marginBottom: 14, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 8 }}>
              ACTIVITIES &amp; ACHIEVEMENTS
            </h2>
            <ul style={{ paddingLeft: 18, fontSize: 13, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>
                <strong>DotComClub (DCC) Member</strong> at Jai Hind College.
              </li>
              <li>
                <strong>Claude 101 Certification</strong> — Completed the official Anthropic certification.
              </li>
              <li>
                <strong>Creative Exploration</strong> — Video editing and 3D rendering in Blender.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
