import React, { useRef, useEffect } from 'react';
import { useWindowManager, type WindowInstance, type WindowId } from '../../context/WindowManagerContext';
import { gsap, Draggable } from '../../lib/motion';

interface WindowProps {
  instance: WindowInstance;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ instance, children }) => {
  const {
    focusedWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindowManager();

  const windowRef = useRef<HTMLDivElement>(null);
  const titlebarRef = useRef<HTMLDivElement>(null);
  const draggableInstanceRef = useRef<any>(null);

  const isFocused = focusedWindowId === instance.id;

  // Initialize GSAP Draggable on the titlebar for desktop
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    const el = windowRef.current;
    const trigger = titlebarRef.current;
    if (!el || !trigger) return;

    // Set initial position
    gsap.set(el, {
      x: instance.position.x,
      y: instance.position.y,
    });

    const [draggable] = Draggable.create(el, {
      trigger: trigger,
      cancel: '.win-control-btn, .titlebar-controls', // Exclude controls from dragging
      dragClickables: false,
      type: 'x,y',
      edgeResistance: 0.75,
      cursor: 'grab',
      activeCursor: 'grabbing',
      zIndexBoost: false,
      bounds: {
        minX: 10,
        maxX: window.innerWidth - 120,
        minY: 44, // Strict boundary: never allows titlebar to move under top bar
        maxY: window.innerHeight - 70,
      },
      onPress: () => {
        focusWindow(instance.id);
      },
      onDragEnd: function () {
        updateWindowPosition(instance.id, { x: this.x, y: this.y });
      },
    });

    draggableInstanceRef.current = draggable;

    return () => {
      draggable?.kill();
      draggableInstanceRef.current = null;
    };
  }, [instance.id, focusWindow, updateWindowPosition]);

  // Sync maximized state with Draggable
  useEffect(() => {
    const draggable = draggableInstanceRef.current;
    if (!draggable || !windowRef.current || window.innerWidth < 768) return;

    if (instance.isMaximized) {
      draggable.disable();
      gsap.to(windowRef.current, {
        x: 8,
        y: 46,
        duration: 0.2,
        ease: 'power2.out',
      });
    } else {
      draggable.enable();
      gsap.to(windowRef.current, {
        x: instance.position.x,
        y: instance.position.y,
        duration: 0.2,
        ease: 'power2.out',
      });
    }
  }, [instance.isMaximized, instance.position.x, instance.position.y]);

  // Corner resize handler
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    focusWindow(instance.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = instance.size.width;
    const startH = instance.size.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newW = startW + (moveEvent.clientX - startX);
      const newH = startH + (moveEvent.clientY - startY);
      updateWindowSize(instance.id, { width: newW, height: newH });
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  if (!instance.isOpen) {
    return null;
  }

  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

  const style: React.CSSProperties = {
    zIndex: instance.zIndex,
    display: instance.isMinimized ? 'none' : 'flex',
    ...(isDesktop
      ? instance.isMaximized
        ? {
            width: 'calc(100vw - 16px)',
            height: 'calc(100vh - 100px)',
          }
        : {
            width: instance.size.width,
            height: instance.size.height,
          }
      : {}),
  };

  return (
    <article
      ref={windowRef}
      className={`os-window-frame ${isFocused ? 'focused' : ''} ${instance.isMinimized ? 'minimized' : ''}`}
      style={style}
      onMouseDown={() => focusWindow(instance.id)}
      role="dialog"
      aria-label={instance.title}
      aria-modal="false"
      tabIndex={-1}
    >
      {/* Titlebar - acts as drag handle */}
      <header className="window-titlebar" ref={titlebarRef}>
        <div className="titlebar-title-text">
          <span
            style={{
              width: 8,
              height: 8,
              backgroundColor: isFocused ? 'var(--accent)' : 'var(--ink-muted)',
              display: 'inline-block',
            }}
            aria-hidden="true"
          />
          <span style={{ cursor: 'grab' }}>{instance.title}</span>
        </div>

        <div
          className="titlebar-controls"
          onMouseDown={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="win-control-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              minimizeWindow(instance.id as WindowId);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            title="Minimize window"
            aria-label="Minimize window"
          >
            _
          </button>
          <button
            type="button"
            className="win-control-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleMaximizeWindow(instance.id as WindowId);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            title={instance.isMaximized ? 'Restore window size' : 'Maximize window'}
            aria-label={instance.isMaximized ? 'Restore window size' : 'Maximize window'}
          >
            {instance.isMaximized ? '▫' : '^'}
          </button>
          <button
            type="button"
            className="win-control-btn close"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeWindow(instance.id as WindowId);
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            title="Close window"
            aria-label="Close window"
          >
            ×
          </button>
        </div>
      </header>

      {/* Window Body Container */}
      <div className="window-body-scroll" data-lenis-prevent="true">
        {children}
      </div>

      {!instance.isMaximized && isDesktop && (
        <div
          className="window-resize-handle"
          onMouseDown={handleResizeStart}
          aria-hidden="true"
          title="Drag to resize window"
        />
      )}
    </article>
  );
};
