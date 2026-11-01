import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useWindowManager, type WindowId } from '../../context/WindowManagerContext';
import { useTheme, type ThemeMode } from '../../context/ThemeContext';
import { PROJECTS_DATA } from '../../data/portfolioData';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: string;
  isHtml?: boolean;
}

const COMMAND_LIST = [
  'help',
  'whoami',
  'ls',
  'cat',
  'projects',
  'open',
  'contact',
  'email',
  'github',
  'theme',
  'clear',
  'history',
  'neofetch',
  'sudo',
];

const VIRTUAL_FILES: Record<string, string> = {
  'about.txt':
    'Meet Rathod (Gojo / iTsukiyomi). First-year BSc IT student. Systems programming in C++, Discord bot architectures, game mechanics in Unity 6. Arch Linux / Omarchy daily driver.',
  'dueler.bot':
    'Pokémon Duel: Discord turn-based battle engine. Asyncio, speed priorities, heuristic minimax AI, FastAPI companion.',
  'mafioso.py':
    'Mafioso: 12+ player hidden-role Mafia engine. FSM phase management, atomic Redis CAS voting, MongoDB.',
  'ani-cli.cpp':
    'ani-cli.cpp: C++20 media streaming tool with POSIX VT100 TUI and process reaper. Zero dependencies.',
  'shedskin.exe':
    'SHEDSKIN: 2D Metroidvania in Unity 6 URP. 16-ray kinematic physics solver with skin-shedding decoy mechanics.',
  'next.txt':
    'next.txt: Bytecode VM research in C++23 and deterministic rollback netcode exploration. Status: Active R&D.',
  'resume.pdf':
    'Resume document available. Run "open resume" to inspect full credentials or print.',
};

// Calculate Levenshtein distance for fuzzy unknown command suggestions
function getClosestCommand(input: string): string | null {
  const clean = input.trim().toLowerCase();
  let closest = '';
  let minDistance = Infinity;

  for (const cmd of COMMAND_LIST) {
    const dist = levenshtein(clean, cmd);
    if (dist < minDistance && dist <= 2) {
      minDistance = dist;
      closest = cmd;
    }
  }
  return closest || null;
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export const TerminalView: React.FC = () => {
  const { openWindow } = useWindowManager();
  const { theme, setMode } = useTheme();

  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'boot-1',
      type: 'output',
      content: `OMARCHY LINUX 7.2.5 (x86_64) | Meet Rathod (Gojo // iTsukiyomi)
Shell: zsh 5.9 | WM: Hyprland | CPU: 1.2% | Memory: 48MB / 128MB
Commands: whoami | projects | open <id> | cat <file> | theme <name> | neofetch | clear`,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const executeCommand = useCallback(
    (cmdRaw: string) => {
      const trimmed = cmdRaw.trim();
      if (!trimmed) return;

      const newHistory = [...history, trimmed];
      setHistory(newHistory);
      setHistoryIndex(-1);

      const parts = trimmed.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      const inputLine: TerminalLine = {
        id: `in-${Date.now()}-${Math.random()}`,
        type: 'input',
        content: `gojo@omarchy:~$ ${trimmed}`,
      };

      let outputLines: TerminalLine[] = [];

      switch (command) {
        case 'help':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `AVAILABLE COMMANDS:
  help               Show this command reference
  whoami             Meet Rathod bio & handles
  ls                 List repository and documentation files
  cat <file>         Print file contents (e.g. cat dueler.bot)
  projects           List engineering case studies with status
  open <id>          Launch project window (dueler, mafioso, ani-cpp, shedskin, about, resume)
  contact | email    Direct email address & reachout info
  github             Open GitHub profile URL
  theme <name|auto>  Set active theme (photocopy, dusk, phosphor, auto)
  neofetch           Render ASCII Linux environment specification
  clear              Clear terminal history (or Ctrl+L)
  history            Display executed command history
  sudo hire-me       Elevated privilege evaluation`,
          });
          break;

        case 'whoami':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `Meet Rathod (Gojo // iTsukiyomi)
Role: First-year BSc IT Student | Systems & Bot Engineer
OS: Arch Linux (Omarchy / Hyprland)
Focus: Systems programming (C++), Asyncio Discord engines (Python), Game mechanics (Unity 6 / C#)
Email: meetr459@gmail.com
GitHub: https://github.com/iTsukiyomi`,
          });
          break;

        case 'ls':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `about.txt   dueler.bot   mafioso.py   ani-cli.cpp   shedskin.exe   next.txt   resume.pdf`,
          });
          break;

        case 'cat':
          if (!args[0]) {
            outputLines.push({
              id: `err-${Date.now()}`,
              type: 'error',
              content: 'cat: missing filename. Example: cat dueler.bot',
            });
          } else {
            const fileName = args[0];
            if (VIRTUAL_FILES[fileName]) {
              outputLines.push({
                id: `out-${Date.now()}`,
                type: 'output',
                content: VIRTUAL_FILES[fileName],
              });
            } else {
              outputLines.push({
                id: `err-${Date.now()}`,
                type: 'error',
                content: `cat: ${fileName}: No such file or directory`,
              });
            }
          }
          break;

        case 'projects':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: Object.values(PROJECTS_DATA)
              .map(
                (p) =>
                  `• ${p.id.padEnd(10)} [${p.typeTag.padEnd(20)}] ${p.shortDesc}`
              )
              .join('\n'),
          });
          break;

        case 'open':
          if (!args[0]) {
            outputLines.push({
              id: `err-${Date.now()}`,
              type: 'error',
              content: 'open: specify project id (dueler, mafioso, ani-cpp, shedskin, about, resume, next)',
            });
          } else {
            const targetId = args[0].toLowerCase().replace(/\.(bot|py|cpp|exe|txt|pdf)$/, '') as WindowId;
            openWindow(targetId);
            outputLines.push({
              id: `out-${Date.now()}`,
              type: 'success',
              content: `Launched window: ${targetId}`,
            });
          }
          break;

        case 'contact':
        case 'email':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `Email: meetr459@gmail.com
LinkedIn: https://www.linkedin.com/in/meet-rathod-a1326a448/
GitHub: https://github.com/iTsukiyomi`,
          });
          break;

        case 'github':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `GitHub: https://github.com/iTsukiyomi (Opening in new tab...)`,
          });
          window.open('https://github.com/iTsukiyomi', '_blank');
          break;

        case 'theme':
          if (!args[0]) {
            outputLines.push({
              id: `out-${Date.now()}`,
              type: 'output',
              content: `Current theme: ${theme}. Options: theme photocopy, theme dusk, theme phosphor, theme auto`,
            });
          } else {
            const target = args[0].toLowerCase();
            if (target === 'photocopy' || target === 'dusk' || target === 'phosphor' || target === 'auto') {
              setMode(target as ThemeMode);
              outputLines.push({
                id: `out-${Date.now()}`,
                type: 'success',
                content: `Theme set to: ${target}`,
              });
            } else {
              outputLines.push({
                id: `err-${Date.now()}`,
                type: 'error',
                content: `theme: invalid theme "${args[0]}". Valid choices: photocopy, dusk, phosphor, auto`,
              });
            }
          }
          break;

        case 'clear':
          setLines([]);
          return;

        case 'history':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: newHistory.map((h, i) => `${i + 1}  ${h}`).join('\n'),
          });
          break;

        case 'neofetch':
          outputLines.push({
            id: `out-${Date.now()}`,
            type: 'output',
            content: `
      /\\         gojo@omarchy
     /  \\        ------------
    / /\\ \\       OS: Arch Linux x86_64 (Omarchy 7.2)
   / /__\\ \\      Host: Engineering Dev Rig
  / /____\\ \\     Kernel: 7.2.5-3-omarchy
 /__________\\    Uptime: 14 days, 6 hours, 28 mins
                 Shell: zsh 5.9
                 WM: Hyprland (Wayland)
                 Terminal: foot / alacritty / VT100
                 CPU: AMD Ryzen 7 @ 4.2GHz
                 Memory: 48.2MB / 128MB [Heap OK]
                 Projects: dueler, mafioso, ani-cpp, shedskin`,
          });
          break;

        case 'sudo':
          if (args.join(' ').toLowerCase() === 'hire-me') {
            outputLines.push({
              id: `out-${Date.now()}`,
              type: 'success',
              content: `[sudo] password for gojo: **********
Authentication successful.
Permission granted: Reach out to Meet Rathod at meetr459@gmail.com to discuss systems, bot architecture, or hackathon collaboration.`,
            });
          } else {
            outputLines.push({
              id: `err-${Date.now()}`,
              type: 'error',
              content: `gojo is not in the sudoers file for "${args.join(' ')}". This incident will be reported. Try: "sudo hire-me"`,
            });
          }
          break;

        default: {
          const suggestion = getClosestCommand(command);
          outputLines.push({
            id: `err-${Date.now()}`,
            type: 'error',
            content: `command not found: ${command}${
              suggestion ? `\nDid you mean: "${suggestion}"?` : ''
            }`,
          });
          break;
        }
      }

      setLines((prev) => [...prev, inputLine, ...outputLines]);
      setInputVal('');
    },
    [history, openWindow, setMode, theme]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setLines([]);
    } else if (e.key === 'Escape') {
      (e.target as HTMLInputElement).blur();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = COMMAND_LIST.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 380,
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        background: 'var(--terminal-bg)',
        color: 'var(--terminal-text)',
        padding: 16,
        userSelect: 'text',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Mobile / Quick Command Chips */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          marginBottom: 14,
          paddingBottom: 10,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 700, alignSelf: 'center' }}>
          CHIPS:
        </span>
        {[
          'help',
          'whoami',
          'projects',
          'neofetch',
          'open dueler',
          'email',
          'sudo hire-me',
        ].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(chip);
            }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              padding: '2px 8px',
              border: '1px solid var(--border)',
              background: 'rgba(255, 255, 255, 0.08)',
              color: 'var(--terminal-text)',
              cursor: 'pointer',
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Terminal History Log */}
      <div
        style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}
        aria-live="polite"
      >
        {lines.map((line) => (
          <div
            key={line.id}
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.45,
              color:
                line.type === 'error'
                  ? '#ff4444'
                  : line.type === 'success'
                  ? 'var(--accent)'
                  : line.type === 'input'
                  ? 'var(--terminal-prompt)'
                  : 'inherit',
            }}
          >
            {line.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Interactive Command Input Line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginTop: 10,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: 8,
        }}
      >
        <span style={{ color: 'var(--terminal-prompt)', fontWeight: 700 }}>
          gojo@omarchy:~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--terminal-text)',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            caretColor: 'var(--accent)',
          }}
          aria-label="Terminal command prompt"
        />
      </div>
    </div>
  );
};
