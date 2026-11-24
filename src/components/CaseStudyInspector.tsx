import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, GitBranch, Code2, Layers, Sparkles } from 'lucide-react';
import { CaseStudy } from '../data/portfolioData';

interface CaseStudyInspectorProps {
  project: CaseStudy | null;
  onClose: () => void;
}

type TabKey = 'how' | 'highlights' | 'code';

export const CaseStudyInspector: React.FC<CaseStudyInspectorProps> = ({ project, onClose }) => {
  const [tab, setTab] = useState<TabKey>('how');

  useEffect(() => {
    setTab('how');
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="inspector-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] } }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspector-title"
        >
          <motion.div
            className="inspector-sheet"
            initial={{ opacity: 0, x: 28, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.98, transition: { duration: 0.18, ease: [0.23, 1, 0.32, 1] } }}
            transition={{ type: 'spring', duration: 0.42, bounce: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="inspector-head">
              <div>
                <h2 id="inspector-title" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.15, margin: 0 }}>
                  {project.title}
                </h2>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--p-muted)', marginTop: '6px' }}>
                  {project.category} &middot; {project.status}
                </div>
              </div>
              <button
                type="button"
                className="inspector-close"
                onClick={onClose}
                aria-label="Close project details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="inspector-tabs" role="tablist" aria-label="Project details">
              {(
                [
                  { key: 'how', label: 'How it works', icon: Layers },
                  { key: 'highlights', label: `Highlights (${project.highlights.length})`, icon: Sparkles },
                  { key: 'code', label: 'Code snippet', icon: Code2 },
                ] as const
              ).map(({ key, label, icon: Icon }) => {
                const selected = tab === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className="inspector-tab"
                    onClick={() => setTab(key)}
                  >
                    {selected && (
                      <motion.span
                        layoutId="inspector-tab-pill"
                        className="inspector-tab__pill"
                        transition={{ type: 'spring', duration: 0.32, bounce: 0.14 }}
                      />
                    )}
                    <span className="inspector-tab__label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Icon size={14} />
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="inspector-body">
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--p-ink)', margin: 0 }}>
                {project.overview}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', padding: '14px', background: 'var(--p-surface)', borderRadius: 'var(--r-md)' }}>
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <div style={{ fontSize: '13px', color: 'var(--p-muted)' }}>{m.label}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 600, color: 'var(--p-ink)', marginTop: '2px' }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="popLayout" initial={false}>
                {tab === 'how' && (
                  <motion.div
                    key="how"
                    initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    style={{ display: 'grid', gap: '12px' }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>Inside the repo</h3>
                    <ul style={{ margin: 0, paddingLeft: '18px', display: 'grid', gap: '10px', fontSize: '15px', lineHeight: 1.55 }}>
                      {project.howItWorks.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--r-sm)',
                            background: 'var(--p-surface)',
                            border: '1px solid var(--line)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '13px',
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                {tab === 'highlights' && (
                  <motion.div
                    key="highlights"
                    initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    style={{ display: 'grid', gap: '14px' }}
                  >
                    {project.highlights.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '16px',
                          background: 'var(--p-surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--r-md)',
                          display: 'grid',
                          gap: '6px',
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: '16px' }}>{h.title}</div>
                        <div style={{ fontSize: '15px', lineHeight: 1.5, color: 'var(--p-muted)' }}>
                          {h.detail}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {tab === 'code' && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    style={{ display: 'grid', gap: '10px' }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--p-muted)' }}>
                      {project.codeSnippet.file}
                    </div>
                    <pre className="traceback-pre" style={{ color: '#dfdedb' }}>{project.codeSnippet.code}</pre>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingTop: '10px', borderTop: '1px solid var(--line)' }}>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <GitBranch size={16} />
                  <span>Open on GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
