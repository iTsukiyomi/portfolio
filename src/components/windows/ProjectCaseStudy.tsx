import React from 'react';
import type { CaseStudy } from '../../data/portfolioData';

interface Props {
  data: CaseStudy;
}

export const ProjectCaseStudy: React.FC<Props> = ({ data }) => {
  return (
    <div className="case-study-root" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header Info Banner */}
      <section style={{ borderBottom: '2px solid var(--border)', paddingBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
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
                marginBottom: 8,
              }}
            >
              {data.typeTag}
            </span>
            <h2 style={{ fontSize: 'var(--text-h2)', lineHeight: 1.1, marginBottom: 8 }}>
              {data.title}
            </h2>
            <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>
              {data.shortDesc}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {data.repoUrl && (
              <a
                href={data.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  border: '2px solid var(--border)',
                  padding: '6px 12px',
                  background: 'var(--bg)',
                  textDecoration: 'none',
                  boxShadow: '2px 2px 0 var(--border)',
                }}
              >
                [GITHUB REPO]
              </a>
            )}
            {data.demoUrl && (
              <a
                href={data.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  fontWeight: 700,
                  border: '2px solid var(--border)',
                  padding: '6px 12px',
                  background: 'var(--accent)',
                  color: 'var(--accent-contrast)',
                  textDecoration: 'none',
                  boxShadow: '2px 2px 0 var(--border)',
                }}
              >
                [RELATED REPO]
              </a>
            )}
          </div>
        </div>

        {/* Metrics Row */}
        {data.metrics && data.metrics.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${data.metrics.length}, 1fr)`,
              gap: 12,
              marginTop: 18,
              padding: '12px 16px',
              border: '1px solid var(--border)',
              background: 'var(--code-bg)',
            }}
          >
            {data.metrics.map((m, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink-muted)' }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 800, color: 'var(--ink)' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Optional Project Screenshot / Asset Preview */}
      {data.image && (
        <section>
          <div
            style={{
              border: '2px solid var(--border)',
              background: 'var(--bg)',
              padding: 8,
              boxShadow: '3px 3px 0 var(--border)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <img
              src={`/portfolio/images/${data.image}`}
              alt={`${data.title} preview`}
              style={{
                maxWidth: '100%',
                maxHeight: 360,
                objectFit: 'contain',
                display: 'block',
                border: '1px solid var(--border)',
              }}
              onError={(e) => {
                const parent = e.currentTarget.parentElement?.parentElement;
                if (parent) parent.style.display = 'none';
              }}
            />
          </div>
        </section>
      )}

      {/* 1. The Problem */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block' }} />
          01. THE PROBLEM & CONSTRAINTS
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.6 }}>{data.problem}</p>
      </section>

      {/* 2. Architecture & Diagram */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block' }} />
          02. SYSTEM ARCHITECTURE
        </h3>

        {/* Rendered SVG Blueprint */}
        <div
          style={{
            border: '2px solid var(--border)',
            background: 'var(--bg)',
            padding: '20px 12px',
            boxShadow: '3px 3px 0 var(--border)',
            marginBottom: 14,
            overflowX: 'auto',
          }}
          dangerouslySetInnerHTML={{ __html: data.architectureDiagramSvg }}
        />

        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.architectureNotes.map((note, idx) => (
            <li key={idx} style={{ fontSize: 14, lineHeight: 1.5 }}>
              {note}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Three Hardest Decisions */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block' }} />
          03. THREE HARDEST DECISIONS
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {data.hardestDecisions.map((dec, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid var(--border)',
                background: 'var(--surface-alt)',
                padding: '14px 16px',
                borderLeft: '4px solid var(--ink)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                {idx + 1}. {dec.title}
              </div>
              <div style={{ fontSize: 14, marginBottom: 6 }}>
                <strong>Decision:</strong> {dec.decision}
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
                <strong>Tradeoff:</strong> {dec.tradeoff}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. What Broke (The Incident) */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 10,
            color: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block' }} />
          04. WHAT BROKE [REAL FAILURE TRACE]
        </h3>

        <p style={{ fontSize: 14, marginBottom: 10 }}>{data.whatBroke.incident}</p>

        {/* Real Error Box */}
        <pre
          style={{
            background: 'var(--terminal-bg)',
            color: 'var(--terminal-text)',
            padding: '14px 16px',
            border: '2px solid var(--border)',
            fontSize: 11,
            lineHeight: 1.45,
            overflowX: 'auto',
            marginBottom: 12,
            fontFamily: 'var(--font-mono)',
          }}
        >
          <code>{data.whatBroke.errorTraceback}</code>
        </pre>

        <div style={{ fontSize: 14, marginBottom: 6 }}>
          <strong>Root Cause:</strong> {data.whatBroke.rootCause}
        </div>
        <div style={{ fontSize: 14 }}>
          <strong>The Fix:</strong> {data.whatBroke.fix}
        </div>
      </section>

      {/* 5. What I Would Change */}
      <section>
        <h3
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 8, height: 8, background: 'var(--accent)', display: 'inline-block' }} />
          05. WHAT I WOULD CHANGE
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.5, fontStyle: 'italic', color: 'var(--ink)' }}>
          "{data.retrospective}"
        </p>
      </section>

      {/* 6. Tech Stack Badges */}
      <section style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, marginRight: 6 }}>
            STACK:
          </span>
          {data.techStack.map((tech, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                border: '1px solid var(--border)',
                padding: '2px 8px',
                background: 'var(--bg)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};
