import React, { useState } from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';

const TOPIC_PRESETS = [
  'General Collaboration',
  'Discord Bot Engineering',
  'C++ Systems Tooling',
  'Unity 6 Game Dev',
  'Hackathon Team',
  'Saying Hello',
];

export const ContactPageView: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [copiedDiscord, setCopiedDiscord] = useState<boolean>(false);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  // Form State
  const [selectedTopic, setSelectedTopic] = useState<string>('General Collaboration');
  const [senderName, setSenderName] = useState<string>('');
  const [senderContact, setSenderContact] = useState<string>('');
  const [messageBody, setMessageBody] = useState<string>('');

  // Minimal Terminal State (Clean, no neofetch spam)
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'Terminal shell ready. Type "help", "whoami", "projects", or "clear".',
  ]);

  const copyToClipboard = (text: string, setFlag: (val: boolean) => void) => {
    navigator.clipboard.writeText(text).then(() => {
      setFlag(true);
      setTimeout(() => setFlag(false), 2000);
    });
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[${selectedTopic}] from ${senderName || 'Developer'}`);
    const body = encodeURIComponent(
      `Hi Meet,\n\n${messageBody || 'I saw your portfolio and would like to connect.'}\n\nFrom: ${
        senderName || 'Anonymous'
      }\nContact: ${senderContact || 'Not provided'}`
    );
    window.location.href = `mailto:${PROFILE_DATA.links.email}?subject=${subject}&body=${body}`;
  };

  const handleCopyDraft = () => {
    const draftText = `To: ${PROFILE_DATA.links.email}\nSubject: [${selectedTopic}] from ${
      senderName || 'Developer'
    }\n\nHi Meet,\n\n${messageBody || 'I saw your portfolio and would like to connect.'}\n\nFrom: ${
      senderName || 'Anonymous'
    } (${senderContact || 'Not provided'})`;
    copyToClipboard(draftText, setCopiedDraft);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = 'Commands: whoami | projects | contact | email | clear';
        break;
      case 'whoami':
        response = 'Meet Rathod (Gojo // iTsukiyomi) — F.Y. B.Sc IT Student, Jai Hind College, Mumbai.';
        break;
      case 'projects':
        response = '1. Pokémon Duel (dueler) | 2. ani-cli.cpp | 3. Mafioso | 4. SHEDSKIN | 5. MangaDex CLI';
        break;
      case 'contact':
      case 'email':
        response = 'Email: meetr459@gmail.com | Phone: +91 8591424976';
        break;
      case 'clear':
        setTerminalOutput([]);
        setTerminalInput('');
        return;
      default:
        response = `command not found: ${cmd}. Type "help" for options.`;
        break;
    }

    setTerminalOutput((prev) => [...prev, `gojo@omarchy:~$ ${cmd}`, response]);
    setTerminalInput('');
  };

  return (
    <div className="page-container">
      <div style={{ marginBottom: 32 }}>
        <span className="pill-badge">COMMUNICATIONS &amp; DISPATCH</span>
        <h1 className="section-title">GET IN TOUCH</h1>
        <p className="section-subtitle">
          Have a question about my projects, bot architecture, systems code, or want to collaborate on a hackathon? Reach out directly.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Direct Access Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {/* Email Card */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">PRIMARY EMAIL</span>
            <div style={{ fontSize: 15, fontWeight: 800, margin: '8px 0 4px 0', wordBreak: 'break-all' }}>
              {PROFILE_DATA.links.email}
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 14 }}>
              Direct email for collaboration, opportunities, and questions.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => copyToClipboard(PROFILE_DATA.links.email, setCopiedEmail)}
                className="btn-secondary"
                style={{ padding: '6px 10px', fontSize: 11 }}
              >
                {copiedEmail ? '✓ Copied' : 'Copy Email'}
              </button>
              <a
                href={`mailto:${PROFILE_DATA.links.email}`}
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: 11 }}
              >
                Send ↗
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">PHONE / WHATSAPP</span>
            <div style={{ fontSize: 15, fontWeight: 800, margin: '8px 0 4px 0' }}>
              +91 8591424976
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 14 }}>
              Direct phone line and WhatsApp for quick communication.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => copyToClipboard('8591424976', setCopiedPhone)}
                className="btn-secondary"
                style={{ padding: '6px 10px', fontSize: 11 }}
              >
                {copiedPhone ? '✓ Copied' : 'Copy Phone'}
              </button>
              <a
                href="tel:8591424976"
                className="btn-primary"
                style={{ padding: '6px 12px', fontSize: 11 }}
              >
                Call ↗
              </a>
            </div>
          </div>

          {/* Discord Card */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">DISCORD</span>
            <div style={{ fontSize: 15, fontWeight: 800, margin: '8px 0 4px 0' }}>
              iTsukiyomi <span style={{ color: 'var(--ink-muted)', fontSize: 12 }}>(Gojo)</span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 14 }}>
              Active on Discord for bot dev, testing, and casual discussions.
            </p>
            <button
              type="button"
              onClick={() => copyToClipboard('iTsukiyomi', setCopiedDiscord)}
              className="btn-secondary"
              style={{ width: '100%', padding: '6px 10px', fontSize: 11, textAlign: 'center', justifyContent: 'center' }}
            >
              {copiedDiscord ? '✓ Copied Handle' : 'Copy Discord Tag'}
            </button>
          </div>

          {/* Profiles Card */}
          <div className="content-card" style={{ marginBottom: 0 }}>
            <span className="pill-badge">PROFILES</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8, fontSize: 13 }}>
              <div>
                <strong>GitHub:</strong> <a href={PROFILE_DATA.links.github} target="_blank" rel="noreferrer">iTsukiyomi</a>
              </div>
              <div>
                <strong>LinkedIn:</strong> <a href={PROFILE_DATA.links.linkedin} target="_blank" rel="noreferrer">Meet Rathod</a>
              </div>
            </div>
          </div>
        </div>

        {/* Message Dispatch Composer */}
        <section className="content-card">
          <h2 style={{ fontSize: 'var(--text-h2)', marginBottom: 16 }}>DIRECT MESSAGE COMPOSER</h2>

          <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Topic Chips */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)', marginBottom: 8 }}>
                SELECT TOPIC:
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {TOPIC_PRESETS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      padding: '4px 10px',
                      fontSize: 11,
                      fontWeight: 700,
                      border: '1.5px solid var(--border)',
                      background: selectedTopic === topic ? 'var(--ink)' : 'var(--surface)',
                      color: selectedTopic === topic ? 'var(--surface)' : 'var(--ink)',
                      cursor: 'pointer',
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  YOUR NAME:
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Alex"
                  style={inputStyle}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                  YOUR EMAIL OR CONTACT:
                </label>
                <input
                  type="text"
                  value={senderContact}
                  onChange={(e) => setSenderContact(e.target.value)}
                  placeholder="e.g. alex@example.com or @alex"
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
                MESSAGE:
              </label>
              <textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder="What would you like to discuss or build?"
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="submit" className="btn-primary">
                Send via Email ✉
              </button>
              <button type="button" onClick={handleCopyDraft} className="btn-secondary">
                {copiedDraft ? '✓ Draft Copied' : 'Copy Draft'}
              </button>
            </div>
          </form>
        </section>

        {/* Optional Clean Mini Terminal (No neofetch spam!) */}
        <section className="content-card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-muted)' }}>
              QUICK COMMAND SHELL
            </span>
            <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>
              Type "help" or "clear"
            </span>
          </div>

          <div
            style={{
              background: 'var(--terminal-bg)',
              color: 'var(--terminal-text)',
              padding: 16,
              border: '2px solid var(--border)',
              fontSize: 12,
              lineHeight: 1.5,
              minHeight: 120,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {terminalOutput.map((out, idx) => (
              <div key={idx} style={{ whiteSpace: 'pre-wrap' }}>
                {out}
              </div>
            ))}

            <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
              <span style={{ color: 'var(--terminal-prompt)', fontWeight: 700 }}>&gt;</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type a command..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'inherit',
                  fontFamily: 'inherit',
                  fontSize: 12,
                }}
              />
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  background: 'var(--surface)',
  border: '2px solid var(--border)',
  color: 'var(--ink)',
  fontFamily: 'inherit',
  fontSize: 13,
  outline: 'none',
};
