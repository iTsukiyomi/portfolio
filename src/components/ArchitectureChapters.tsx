import React from 'react';

export const ArchitectureChapters: React.FC = React.memo(() => {
  return (
    <section
      className="section ground-inverse"
      id="architecture"
      data-moment="pinned-chapters"
      aria-labelledby="arch-h"
    >
      <div className="wrap mo-pc__grid">
        <div className="mo-pc__text">
          <h2 id="arch-h">How the Python systems work</h2>
          <ol className="mo-pc__steps">
            <li className="mo-pc__step">
              <h3>Dueler Python battle loop</h3>
              <p>
                Dueler coordinates both trainers with asyncio events each turn, resolving speed order, forced swaps, weather, terrain, Trick Room, and NPC moves.
              </p>
              <figure className="mo-pc__visual mo-pc__visual--card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#dfdedb' }}>
                    dueler // pokemonduel/battle/battle.py
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#c2d8ff' }}>
                    asyncio turn loop
                  </span>
                </div>
                <div className="chapter-sim-box">
                  <div style={{ color: '#b8b6b0' }}># Wait for both trainers before resolving turn</div>
                  <div>self.trainer1.event.clear()</div>
                  <div>self.trainer2.event.clear()</div>
                  <div>if not self.trainer2.is_human():</div>
                  <div>&nbsp;&nbsp;self.trainer2.move(self.trainer1.current_pokemon, self)</div>
                  <div style={{ color: '#86efac' }}>await self.trainer1.event.wait()</div>
                  <div style={{ color: '#86efac' }}>await self.trainer2.event.wait()</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#dfdedb' }}>
                  <span>Weather, terrain &amp; Trick Room</span>
                  <span>Elo K=32 ratings</span>
                </div>
              </figure>
            </li>

            <li className="mo-pc__step">
              <h3>Mafioso Discord game with SQLite</h3>
              <p>
                Mafioso splits players into Protagonists, Villains, and Neutrals, saving profiles, shops, achievements, and match history in SQLite via aiosqlite.
              </p>
              <figure className="mo-pc__visual mo-pc__visual--card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#dfdedb' }}>
                    MafiosoStudios/Mafia // game_engine.py
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#86efac' }}>
                    Slash + prefix
                  </span>
                </div>
                <div className="chapter-sim-box">
                  <div style={{ color: '#b8b6b0' }}># Player state tracked per match</div>
                  <div>@dataclass(slots=True)</div>
                  <div>class GamePlayerState:</div>
                  <div>&nbsp;&nbsp;user_id: int</div>
                  <div>&nbsp;&nbsp;role_key: str | None = None</div>
                  <div>&nbsp;&nbsp;faction: str | None = None</div>
                  <div style={{ color: '#c2d8ff' }}>&nbsp;&nbsp;alive: bool = True</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#dfdedb' }}>
                  <span>Day trials &amp; night actions</span>
                  <span>SQLite persistence</span>
                </div>
              </figure>
            </li>

            <li className="mo-pc__step">
              <h3>PyRedis Python server</h3>
              <p>
                PyRedis handles multiple redis-cli clients on one selectors event loop, decoding RESP commands and expiring keys every 100ms.
              </p>
              <figure className="mo-pc__visual mo-pc__visual--card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#dfdedb' }}>
                    iTsukiyomi/PyRedis // server.py
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#c2d8ff' }}>
                    11 commands
                  </span>
                </div>
                <div className="chapter-sim-box">
                  <div style={{ color: '#b8b6b0' }}># Non-blocking I/O multiplexing loop</div>
                  <div>while True:</div>
                  <div>&nbsp;&nbsp;events = self.selector.select(timeout=0.1)</div>
                  <div>&nbsp;&nbsp;self.store.active_expiry_cycle()</div>
                  <div style={{ color: '#86efac' }}>&nbsp;&nbsp;for key, mask in events: key.data(key.fileobj)</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#dfdedb' }}>
                  <span>Passive + active expiry</span>
                  <span>Works with redis-cli</span>
                </div>
              </figure>
            </li>
          </ol>
        </div>

        <div className="mo-pc__visuals frame" />
      </div>
    </section>
  );
});
