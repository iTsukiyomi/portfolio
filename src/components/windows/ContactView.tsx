import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/portfolioData';

const TOPIC_PRESETS = [
  'General Collaboration',
  'Discord Bot Engineering',
  'C++ Systems Tooling',
  'Unity 6 Game Dev',
  'Hackathon Team',
  'Saying Hello',
];

export const ContactView: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedDiscord, setCopiedDiscord] = useState<boolean>(false);
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);

  // Form State
  const [selectedTopic, setSelectedTopic] = useState<string>('General Collaboration');
  const [senderName, setSenderName] = useState<string>('');
  const [senderContact, setSenderContact] = useState<string>('');
  const [messageBody, setMessageBody] = useState<string>('');

  // Local Mumbai time in UTC+5:30
  const [mumbaiTime, setMumbaiTime] = useState<string>('');
  useEffect(() => {
    const updateTime = () => {
      setMumbaiTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'var(--font-mono)' }}>
      {/* Header Banner */}
      <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                background: 'var(--ink)',
                color: 'var(--surface)',
                padding: '2px 8px',
                display: 'inline-block',
                marginBottom: 6,
              }}
            >
              COMMUNICATIONS // DISPATCH
            </span>
            <h1 style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1 }}>
              GET IN TOUCH
            </h1>
          </div>

          <div style={{ fontSize: 11, textAlign: 'right' }}>
            <div>LOC: MUMBAI, IN [UTC+5:30]</div>
            <div style={{ color: 'var(--accent)', fontWeight: 800 }}>LIVE TIME: {mumbaiTime || '14:30:00'}</div>
          </div>
        </div>

        <p style={{ fontSize: 13, color: 'var(--ink)', marginTop: 8, lineHeight: 1.5 }}>
          Have a question about my projects, bot architecture, systems code, or want to build something together? Reach out directly:
        </p>
      </div>

      {/* Direct Contact Methods Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 14,
        }}
      >
        {/* Email Card */}
        <div
          style={{
            border: '2px solid var(--border)',
            background: 'var(--surface)',
            padding: 16,
            boxShadow: '3px 3px 0 var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 800, marginBottom: 4 }}>
              [PRIMARY EMAIL]
            </div>
            <div style={{ fontSize: 14, fontWeight: 800, wordBreak: 'break-all' }}>
              {PROFILE_DATA.links.email}
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>
              Best for project inquiries, collaborations &amp; opportunities.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => copyToClipboard(PROFILE_DATA.links.email, setCopiedEmail)}
              className="desktop-action-btn"
              style={{ flex: 1, padding: '6px 8px' }}
            >
              {copiedEmail ? '✓ COPIED!' : 'COPY EMAIL'}
            </button>
            <a
              href={`mailto:${PROFILE_DATA.links.email}`}
              className="desktop-action-btn"
              style={{ textDecoration: 'none', textAlign: 'center', padding: '6px 12px' }}
            >
              SEND ↗
            </a>
          </div>
        </div>

        {/* Discord Card */}
        <div
          style={{
            border: '2px solid var(--border)',
            background: 'var(--surface)',
            padding: 16,
            boxShadow: '3px 3px 0 var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 800, marginBottom: 4 }}>
              [DISCORD HANDLE]
            </div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              iTsukiyomi <span style={{ color: 'var(--ink-muted)', fontSize: 12 }}>(Gojo)</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>
              Active on Discord for bot dev, testing, and quick chats.
            </div>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard('iTsukiyomi', setCopiedDiscord)}
            className="desktop-action-btn"
            style={{ width: '100%', padding: '6px 8px' }}
          >
            {copiedDiscord ? '✓ COPIED HANDLE!' : 'COPY DISCORD TAG'}
          </button>
        </div>

        {/* GitHub Card */}
        <div
          style={{
            border: '2px solid var(--border)',
            background: 'var(--surface)',
            padding: 16,
            boxShadow: '3px 3px 0 var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 800, marginBottom: 4 }}>
              [GITHUB PROFILE]
            </div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              github.com/iTsukiyomi
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>
              Inspect repositories, source code, commits, and releases.
            </div>
          </div>

          <a
            href={PROFILE_DATA.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-action-btn"
            style={{ textDecoration: 'none', textAlign: 'center', padding: '6px 8px' }}
          >
            OPEN GITHUB ↗
          </a>
        </div>

        {/* LinkedIn Card */}
        <div
          style={{
            border: '2px solid var(--border)',
            background: 'var(--surface)',
            padding: 16,
            boxShadow: '3px 3px 0 var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 800, marginBottom: 4 }}>
              [LINKEDIN]
            </div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>
              Meet Rathod
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>
              Professional profile and network connection.
            </div>
          </div>

          <a
            href={PROFILE_DATA.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="desktop-action-btn"
            style={{ textDecoration: 'none', textAlign: 'center', padding: '6px 8px' }}
          >
            CONNECT ON LINKEDIN ↗
          </a>
        </div>
      </div>

      {/* Interactive Message Dispatch Form */}
      <section
        style={{
          border: '2px solid var(--border)',
          background: 'var(--surface-alt)',
          padding: 20,
          boxShadow: '3px 3px 0 var(--border)',
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 800, marginBottom: 12, borderBottom: '1px solid var(--border)', paddingBottom: 6 }}>
          DIRECT DISPATCH COMPOSER
        </div>

        <form onSubmit={handleSendEmail} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Topic Select Chips */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, color: 'var(--ink-muted)' }}>
              TOPIC:
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {TOPIC_PRESETS.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    fontWeight: 800,
                    padding: '3px 8px',
                    border: '1px solid var(--border)',
                    background: selectedTopic === topic ? 'var(--ink)' : 'var(--bg)',
                    color: selectedTopic === topic ? 'var(--surface)' : 'var(--ink)',
                    cursor: 'pointer',
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Contact Fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>
                YOUR NAME / HANDLE:
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
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>
                YOUR EMAIL OR DISCORD:
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

          {/* Message Textarea */}
          <div>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>
              MESSAGE:
            </label>
            <textarea
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              placeholder="What would you like to build or discuss?"
              rows={4}
              style={{ ...inputStyle, resize: 'vertical' }}
              required
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 4 }}>
            <button
              type="submit"
              className="start-btn"
              style={{ height: 38, padding: '0 20px' }}
            >
              <span>SEND VIA EMAIL ✉</span>
            </button>

            <button
              type="button"
              onClick={handleCopyDraft}
              className="desktop-action-btn"
              style={{ height: 38, padding: '0 16px' }}
            >
              {copiedDraft ? '✓ DRAFT COPIED!' : 'COPY MESSAGE DRAFT'}
            </button>

            <span style={{ fontSize: 10, color: 'var(--ink-muted)', marginLeft: 'auto' }}>
              Typical response: &lt; 24h
            </span>
          </div>
        </form>
      </section>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  background: 'var(--bg)',
  border: '2px solid var(--border)',
  color: 'var(--ink)',
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  outline: 'none',
  boxSizing: 'border-box',
};
