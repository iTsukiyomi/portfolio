import React, { useState, useEffect, useCallback } from 'react';

const BOOT_LOGS = [
  'OMARCHY BIOS v2.4 (x86_64 UEFI)',
  'Checking system memory... 16384 MB OK',
  'Loading Linux kernel 7.2.5-3-omarchy...',
  'Mounting root filesystem (nvme0n1p2) [EXT4]',
  'Initializing Wayland compositor: Hyprland [OK]',
  'Starting portfolio desktop environment...',
  'MEET RATHOD // READY.',
];

interface Props {
  onComplete: () => void;
}

export const BootSequence: React.FC<Props> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem('meet_boot_shown') === 'true';
    } catch {
      alreadyShown = false;
    }
    return isReduced || alreadyShown;
  });

  const finishBoot = useCallback(() => {
    setIsDone(true);
    try {
      sessionStorage.setItem('meet_boot_shown', 'true');
    } catch {
      // Safe fallback
    }
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (isDone) {
      onComplete();
      return;
    }

    // Step through boot lines sequentially in < 2.0 seconds
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < BOOT_LOGS.length) {
        const nextLine = BOOT_LOGS[currentIndex];
        setLogs((prev) => [...prev, nextLine]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(finishBoot, 200);
      }
    }, 240);

    const handleSkip = (e: Event) => {
      e.preventDefault();
      clearInterval(interval);
      finishBoot();
    };

    window.addEventListener('keydown', handleSkip, { once: true });
    window.addEventListener('pointerdown', handleSkip, { once: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('pointerdown', handleSkip);
    };
  }, [isDone, onComplete, finishBoot]);

  if (isDone) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#0a0c0a',
        color: '#ffb300',
        fontFamily: 'var(--font-mono)',
        fontSize: 13,
        lineHeight: 1.6,
        padding: 32,
        zIndex: 9999999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        userSelect: 'none',
      }}
      role="status"
      aria-live="assertive"
      aria-label="System Boot Sequence"
    >
      <div style={{ marginBottom: 16, borderBottom: '1px solid #3d2f08', paddingBottom: 8, color: '#39ff14' }}>
        [OMARCHY CORE INITIALIZATION] — PRESS ANY KEY TO SKIP
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {logs.map((log, i) => (
          <div key={i} style={{ color: i === logs.length - 1 ? '#39ff14' : 'inherit' }}>
            &gt; {log}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 'auto',
          fontSize: 11,
          color: '#ffb300',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>STATUS: BOOTING WORKSPACE</span>
        <span>TAP SCREEN OR PRESS ANY KEY</span>
      </div>
    </div>
  );
};
