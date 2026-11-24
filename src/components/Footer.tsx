import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface FooterProps {
  onSelectProject: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectProject }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 1800);
  };

  const copyDiscord = () => {
    navigator.clipboard.writeText(PROFILE_DATA.handles.discord);
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 1800);
  };

  return (
    <footer className="footer closing footer--statement" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">Contact Meet Rathod</h2>
            <p>Open to internships, Python backend or Discord bot projects, and open-source work.</p>
          </div>
          <a className="btn btn--primary btn--xl" href={`mailto:${PROFILE_DATA.links.email}`}>
            Email Meet Rathod
            <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
              <path className="m-arrow__stem" d="M1 6h8" />
              <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
            </svg>
          </a>
        </div>

        <div className="closing__links">
          <div className="grid">
            <div className="span-4 stack-4">
              <a className="nav__logo" href="#top">{PROFILE_DATA.name}</a>
              <p className="footer__lede">
                First-year BSc IT student building Discord bots, Python servers, and FastAPI tools.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <button type="button" className="copy-pill" onClick={copyEmail}>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {copiedEmail ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                        transition={{ duration: 0.16 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--p-accent)' }}
                      >
                        <Check size={14} />
                        Copied email
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }}
                        transition={{ duration: 0.16 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Copy size={14} />
                        {PROFILE_DATA.links.email}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            <div className="span-2 footer__col">
              <h3>Projects</h3>
              <ul>
                <li><a href="#work" onClick={() => onSelectProject('dueler')}>Dueler</a></li>
                <li><a href="#work" onClick={() => onSelectProject('mafia')}>Mafioso</a></li>
                <li><a href="#work" onClick={() => onSelectProject('pyredis')}>PyRedis</a></li>
                <li><a href="#work" onClick={() => onSelectProject('fastapi')}>FastAPI Projects</a></li>
              </ul>
            </div>

            <div className="span-2 footer__col">
              <h3>More on GitHub</h3>
              <ul>
                <li><a href="https://github.com/iTsukiyomi/PyMessage" target="_blank" rel="noopener noreferrer">PyMessage</a></li>
                <li><a href="https://github.com/iTsukiyomi/chatbot" target="_blank" rel="noopener noreferrer">chatbot</a></li>
                <li><a href="https://github.com/iTsukiyomi/manga-cli" target="_blank" rel="noopener noreferrer">manga-cli</a></li>
                <li><a href={PROFILE_DATA.links.repos} target="_blank" rel="noopener noreferrer">All repositories</a></li>
              </ul>
            </div>

            <div className="span-2 footer__col">
              <h3>Profiles</h3>
              <ul>
                <li><a href={PROFILE_DATA.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href={PROFILE_DATA.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li>
                  <button
                    type="button"
                    onClick={copyDiscord}
                    style={{ border: 0, background: 'none', padding: 0, font: 'inherit', color: 'inherit', cursor: 'pointer' }}
                  >
                    {copiedDiscord ? 'Copied kaizen__009' : 'Discord: kaizen__009'}
                  </button>
                </li>
              </ul>
            </div>

            <div className="span-2 footer__col">
              <h3>Direct</h3>
              <ul>
                <li><a href={`mailto:${PROFILE_DATA.links.email}`}>Send email</a></li>
                <li><a href="#top">Back to top</a></li>
              </ul>
            </div>
          </div>

          <div className="footer__legal">
            <span>&copy; 2026 {PROFILE_DATA.name}</span>
            <span className="credits">Product names and logos are trademarks of their owners</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
