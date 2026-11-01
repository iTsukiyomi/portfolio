import React from 'react';

export const NextView: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: 'var(--font-mono)' }}>
      <div style={{ borderBottom: '2px solid var(--border)', paddingBottom: 12 }}>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            background: 'var(--ink)',
            color: 'var(--surface)',
            padding: '2px 8px',
            display: 'inline-block',
            marginBottom: 6,
          }}
        >
          DRAFT // WORK IN PROGRESS
        </span>
        <h2 style={{ fontSize: 24, fontWeight: 900, fontFamily: 'var(--font-display)' }}>
          next.txt — What I Am Building Next
        </h2>
      </div>

      <div
        style={{
          border: '1px solid var(--border)',
          background: 'var(--terminal-bg)',
          color: 'var(--terminal-text)',
          padding: 18,
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <p style={{ color: 'var(--accent)', fontWeight: 700, marginBottom: 8 }}>
          // ROADMAP & COMPILER EXPLORATION
        </p>
        <p style={{ marginBottom: 12 }}>
          1. <strong>Stack vs Register Bytecode VM in C++23:</strong> Benchmarking instruction dispatch overhead, NaN-tagging value representation, and generational garbage collection against real Lua 5.4 and Python bytecodes.
        </p>
        <p style={{ marginBottom: 12 }}>
          2. <strong>Deterministic Rollback Networking Engine:</strong> Building a peer-to-peer lockstep simulator in C++ with frame state desync verification for 2D platform fighters.
        </p>
        <p style={{ color: '#888', fontStyle: 'italic' }}>
          TODO(meet): Add benchmarks and public repo link once the virtual machine passes arithmetic instruction test suites.
        </p>
      </div>

      <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
        Status: Active prototype / Research phase.
      </div>
    </div>
  );
};
