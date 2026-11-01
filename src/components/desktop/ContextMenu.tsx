import React, { useEffect, useRef } from 'react';
import { useTheme, type ThemeMode } from '../../context/ThemeContext';
import { useWindowManager } from '../../context/WindowManagerContext';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose }) => {
  const { theme, mode, setMode } = useTheme();
  const { openWindow, windows, closeWindow } = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close context menu when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Adjust menu position so it never overflows viewport
  const menuWidth = 220;
  const menuHeight = 270;
  const clampedX = Math.max(10, Math.min(x, window.innerWidth - menuWidth - 10));
  const clampedY = Math.max(44, Math.min(y, window.innerHeight - menuHeight - 50));

  const handleThemeSelect = (targetMode: ThemeMode) => {
    setMode(targetMode);
    onClose();
  };

  const handleCloseAll = () => {
    Object.values(windows).forEach((w) => {
      if (w.isOpen) {
        closeWindow(w.id);
      }
    });
    onClose();
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        left: clampedX,
        top: clampedY,
        width: menuWidth,
        background: 'var(--surface)',
        border: '2px solid var(--border)',
        boxShadow: '4px 4px 0 var(--border)',
        zIndex: 99999,
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        userSelect: 'none',
      }}
      role="menu"
      aria-label="Desktop Context Menu"
    >
      <div style={{ padding: '4px 0' }}>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={menuItemStyle}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
          role="menuitem"
        >
          <span>⟳ Reload Workspace</span>
        </button>

        <div style={separatorStyle} />

        <div style={{ padding: '3px 12px', fontSize: 9, color: 'var(--ink-muted)', fontWeight: 800 }}>
          THEMES:
        </div>

        <button
          type="button"
          onClick={() => handleThemeSelect('photocopy')}
          style={menuItemStyle}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
          role="menuitem"
        >
          <span>Theme: Photocopy</span>
          {mode === 'photocopy' && <span style={{ color: 'var(--accent)', fontWeight: 800 }}>✓</span>}
        </button>

        <button
          type="button"
          onClick={() => handleThemeSelect('dusk')}
          style={menuItemStyle}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
          role="menuitem"
        >
          <span>Theme: Dusk</span>
          {mode === 'dusk' && <span style={{ color: 'var(--accent)', fontWeight: 800 }}>✓</span>}
        </button>

        <button
          type="button"
          onClick={() => handleThemeSelect('phosphor')}
          style={menuItemStyle}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
          role="menuitem"
        >
          <span>Theme: Phosphor</span>
          {mode === 'phosphor' && <span style={{ color: 'var(--accent)', fontWeight: 800 }}>✓</span>}
        </button>

        <button
          type="button"
          onClick={() => handleThemeSelect('auto')}
          style={menuItemStyle}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
          role="menuitem"
        >
          <span>Theme: Auto [{theme.toUpperCase()}]</span>
          {mode === 'auto' && <span style={{ color: 'var(--accent)', fontWeight: 800 }}>✓</span>}
        </button>

        <div style={separatorStyle} />

        <button
          type="button"
          onClick={() => {
            openWindow('contact');
            onClose();
          }}
          style={menuItemStyle}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
          role="menuitem"
        >
          <span>▶ Open Terminal (contact.sh)</span>
        </button>

        <button
          type="button"
          onClick={handleCloseAll}
          style={menuItemStyle}
          onMouseEnter={onHoverIn}
          onMouseLeave={onHoverOut}
          role="menuitem"
        >
          <span>× Close All Windows</span>
        </button>
      </div>
    </div>
  );
};

const menuItemStyle: React.CSSProperties = {
  width: '100%',
  textAlign: 'left',
  padding: '6px 14px',
  background: 'transparent',
  border: 'none',
  fontFamily: 'inherit',
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--ink)',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const separatorStyle: React.CSSProperties = {
  height: 1,
  background: 'var(--border)',
  margin: '4px 0',
  opacity: 0.3,
};

const onHoverIn = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = 'var(--accent)';
  e.currentTarget.style.color = 'var(--accent-contrast)';
};

const onHoverOut = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.currentTarget.style.background = 'transparent';
  e.currentTarget.style.color = 'var(--ink)';
};
