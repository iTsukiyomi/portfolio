import React from 'react';
import { PROFILE_DATA, PROJECTS_DATA } from '../data/portfolioData';

interface WorkSectionProps {
  onSelectProject: (id: string) => void;
}

const MafiosoDiagram = React.memo(() => {
  const spec = JSON.stringify({
    layout: 'hub',
    ground: 'none',
    motion: { pulse: 'none' },
    alt: 'Mafioso Discord game connects Lobby, Day Vote, Night Actions, and SQLite stats.',
    center: { label: 'Mafioso', icon: 'discord' },
    spokes: [
      { label: 'Lobby', icon: 'discord' },
      { label: 'Day Vote', icon: 'ui:git-branch' },
      { label: 'Night', icon: 'python' },
      { label: 'SQLite', icon: 'sqlite' },
    ],
  });

  return <div className="dg" role="img" aria-label="Mafioso Discord game architecture" data-dg-still="" data-diagram={spec} />;
});

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectProject }) => {
  return (
    <section className="section g2" id="work" aria-labelledby="work-h">
      <div className="wrap">
        {/* Screen 1 of #work: Heading + First 2 Cards */}
        <div className="group">
          <div className="section-head section-head--row">
            <div>
              <h2 id="work-h">
                Python bots, servers, and APIs.{' '}
                <span className="muted">Four public repositories, plus more on GitHub.</span>
              </h2>
            </div>
            <a
              className="link"
              href={PROFILE_DATA.links.repos}
              target="_blank"
              rel="noopener noreferrer"
            >
              More projects on GitHub
            </a>
          </div>

          <div className="grid">
            {/* Card 1: Dueler */}
            <article className="card card--row card--open span-6">
              <h3>{PROJECTS_DATA.dueler.cardHeading}</h3>
              <p>{PROJECTS_DATA.dueler.summary}</p>
              <button
                type="button"
                className="work-card-btn"
                onClick={() => onSelectProject('dueler')}
              >
                See Dueler details
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </button>

              <div
                className="panel"
                onClick={() => onSelectProject('dueler')}
                style={{ cursor: 'pointer', marginTop: 'var(--s-5)' }}
              >
                <div className="stage stage--fade-b">
                  <div
                    className="at-corner fit"
                    style={{ '--fit-max': '480px', '--ax': '32px', '--ay': '32px', '--ay-sm': '16px' } as React.CSSProperties}
                    data-ui-still=""
                  >
                    <div className="ui ui-panel ui-diff" data-ui="diff-review">
                      <div className="ui-diff__head">
                        <svg className="ui-icon ui-diff__fold" viewBox="0 0 16 16" aria-hidden="true">
                          <path d="m4.5 6.25 3.5 3.5 3.5-3.5" />
                        </svg>
                        <span className="ui-diff__tool" aria-hidden="true">
                          <img src="assets/icons/python.svg" alt="" width={16} height={16} loading="lazy" />
                        </span>
                        <span className="ui-diff__repo">dueler</span>
                        <i className="ui-diff__slash" aria-hidden="true">/</i>
                        <span className="ui-diff__path">
                          <span className="ui-diff__dir">battle/</span>
                          <b>battle.py</b>
                        </span>
                        <span className="ui-spacer" />
                        <span className="ui-diff__stat">
                          <b className="is-add">
                            <span className="ui-diff__was">+3</span>
                            <span className="ui-diff__now">+4</span>
                          </b>
                          <b className="is-del">
                            <span className="ui-diff__was">&minus;1</span>
                            <span className="ui-diff__now">&minus;2</span>
                          </b>
                          <span className="ui-diff__bar" aria-hidden="true">
                            <i className="is-add" /><i className="is-add" /><i className="is-add" /><i className="is-del" />
                          </span>
                        </span>
                      </div>
                      <div className="ui-diff__hunk">
                        <span>@@ -142,8 +142,9 @@</span>{' '}
                        <em className="ui-diff__sig">async def run(self):</em>
                      </div>
                      <div className="ui-diff__lines">
                        <div className="ui-diff__ln">
                          <i>142</i><i>142</i>
                          <span className="ui-diff__code" data-i="1">
                            <span className="ui-diff__ind">  </span>
                            <span className="k">self</span>.trainer1.event.<span className="f">clear</span>()
                          </span>
                        </div>
                        <div className="ui-diff__ln is-del">
                          <i>143</i><i></i>
                          <span className="ui-diff__code" data-i="1">
                            <span className="ui-diff__ind">  </span>
                            <span className="k">await</span> asyncio.<span className="f">sleep</span>(<span className="n">5</span>)
                          </span>
                        </div>
                        <div className="ui-diff__ln is-add">
                          <i></i><i>143</i>
                          <span className="ui-diff__code" data-i="1">
                            <span className="ui-diff__ind">  </span>
                            <span className="k">if not</span> trainer2.<span className="f">is_human</span>(): trainer2.<span className="f">move</span>()
                          </span>
                        </div>
                        <div className="ui-diff__ln is-target" data-diff-target="">
                          <i>144</i><i>144</i>
                          <span className="ui-diff__code" data-i="1">
                            <span className="ui-diff__ind">  </span>
                            <span className="k">await</span> <mark className="ui-diff__w">trainer1.event.wait()</mark>
                          </span>
                        </div>
                        <div className="ui-diff__sug" data-diff-sug="">
                          <div className="ui-diff__ln is-add">
                            <i></i><i>144</i>
                            <span className="ui-diff__code" data-i="1">
                              <span className="ui-diff__ind">  </span>
                              <span className="k">await</span> <mark className="ui-diff__w">asyncio.gather(t1.wait(), t2.wait())</mark>
                            </span>
                          </div>
                        </div>
                        <div className="ui-diff__thread">
                          <div className="ui-diff__by">
                            <span className="ui-avatar" data-tone="4">MR</span>
                            <span className="ui-diff__name">Meet Rathod</span>
                            <span className="ui-diff__time">battle loop</span>
                            <span className="ui-spacer" />
                            <span className="ui-diff__act" data-diff-act="">
                              <button className="ui-btn ui-btn--sm ui-diff__apply" type="button" tabIndex={-1} data-diff-apply="">
                                <span className="ui-diff__lbl">Apply suggestion</span>
                                <i className="ui-diff__spin" aria-hidden="true" />
                              </button>
                              <span className="ui-chip ui-diff__done">
                                <svg viewBox="0 0 16 16" aria-hidden="true">
                                  <path d="m4 8.4 2.6 2.6L12 5.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Applied
                              </span>
                            </span>
                          </div>
                          <div className="ui-diff__msg">Wait for both trainers concurrently before resolving turn speed order.</div>
                        </div>
                        <div className="ui-diff__ln">
                          <i>145</i><i>145</i>
                          <span className="ui-diff__code" data-i="1">
                            <span className="ui-diff__ind">  </span>
                            <span className="k">battle_view</span>.<span className="f">stop</span>()
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 2: Mafioso */}
            <article className="card card--row card--open span-6">
              <h3>{PROJECTS_DATA.mafia.cardHeading}</h3>
              <p>{PROJECTS_DATA.mafia.summary}</p>
              <button
                type="button"
                className="work-card-btn"
                onClick={() => onSelectProject('mafia')}
              >
                See Mafioso details
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </button>

              <div
                className="panel"
                onClick={() => onSelectProject('mafia')}
                style={{ cursor: 'pointer', marginTop: 'var(--s-5)' }}
              >
                <MafiosoDiagram />
              </div>
            </article>
          </div>
        </div>

        {/* Screen 2 of #work: PyRedis + FastAPI Projects + Counter-Rolls */}
        <div>
          <div className="grid">
            {/* Card 3: PyRedis */}
            <article className="card card--row card--open span-6">
              <h3>{PROJECTS_DATA.pyredis.cardHeading}</h3>
              <p>{PROJECTS_DATA.pyredis.summary}</p>
              <button
                type="button"
                className="work-card-btn"
                onClick={() => onSelectProject('pyredis')}
              >
                See PyRedis details
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </button>

              <div
                className="panel"
                onClick={() => onSelectProject('pyredis')}
                style={{ cursor: 'pointer', marginTop: 'var(--s-5)' }}
              >
                <div className="stage">
                  <div
                    className="at-rise fit"
                    style={{ '--fit-max': '440px', '--ax': 'max(24px, 50% - 220px)', '--ay': '32px', '--ay-sm': '16px' } as React.CSSProperties}
                    data-ui-loop=""
                  >
                    <div className="ui ui-panel ui-term" data-ui="terminal-run">
                      <div className="ui-term__head">
                        <span className="ui-dots" aria-hidden="true"><i /><i /><i /></span>
                        <span className="ui-term__title">iTsukiyomi/PyRedis</span>
                        <span className="ui-meta">redis-cli</span>
                        <span className="ui-spacer" />
                        <span className="ui-chip ui-chip--plain ui-term__branch">
                          <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="5" cy="3.5" r="1.5" /><circle cx="5" cy="12.5" r="1.5" /><circle cx="11" cy="5.5" r="1.5" />
                            <path d="M5 5v6M11 7c0 2.6-6 1.8-6 4" />
                          </svg>
                          main
                        </span>
                      </div>
                      <div className="ui-term__screen" data-term-screen="">
                        <div className="ui-term__track" data-term-track="">
                          <div className="ui-term__ln ui-term__cmd">
                            <span className="ui-term__cwd">~/<span className="ui-term__up">src/</span>PyRedis</span>
                            <span className="ui-term__sig">$</span>
                            <span className="ui-term__typed" data-term-cmd="">python server.py</span>
                          </div>
                          <div className="ui-term__ln ui-term__meter" data-term-out="" data-term-meter="">
                            <span className="ui-term__bar" style={{ '--p': 1 } as React.CSSProperties}><i /></span>
                            <span className="ui-term__count" data-term-count="">4 of 4 checks</span>
                          </div>
                          <div className="ui-term__ln ui-term__log" data-term-out="" data-term-step="">
                            <svg className="ui-term__tick" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" /></svg>
                            <span className="ui-term__path">PING -&gt; PONG</span>
                            <span className="ui-term__n">RESP</span>
                            <span className="ui-term__t">ok</span>
                          </div>
                          <div className="ui-term__ln ui-term__log" data-term-out="" data-term-step="">
                            <svg className="ui-term__tick" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" /></svg>
                            <span className="ui-term__path">SET name gojo EX 60</span>
                            <span className="ui-term__n">TTL</span>
                            <span className="ui-term__t">OK</span>
                          </div>
                          <div className="ui-term__ln ui-term__log" data-term-out="" data-term-step="">
                            <svg className="ui-term__tick" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 8.4 2.8 2.8 6.2-6.4" /></svg>
                            <span className="ui-term__path">GET name</span>
                            <span className="ui-term__n">store</span>
                            <span className="ui-term__t">"gojo"</span>
                          </div>
                          <div className="ui-term__ln ui-term__gap" data-term-out="" aria-hidden="true" />
                          <div className="ui-term__ln ui-term__sum" data-term-out="">
                            <span className="ui-term__key">Commands</span>
                            <span className="ui-term__val">11 supported</span>
                            <span className="ui-term__dim">(RESP)</span>
                          </div>
                          <div className="ui-term__ln ui-term__done" data-term-out="" data-term-done="">
                            <span className="ui-term__ok">
                              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 8.3 2.4 2.4 4.6-5" /></svg>
                            </span>
                            <b>Listening</b>
                            <span className="ui-term__dim">127.0.0.1:6379</span>
                          </div>
                          <div className="ui-term__ln ui-term__cmd" data-term-next="">
                            <span className="ui-term__cwd">~/<span className="ui-term__up">src/</span>PyRedis</span>
                            <span className="ui-term__sig">$</span>
                            <span className="ui-term__typed" />
                            <i className="ui-term__caret" aria-hidden="true" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 4: FastAPI Projects */}
            <article className="card card--row card--open span-6">
              <h3>{PROJECTS_DATA.fastapi.cardHeading}</h3>
              <p>{PROJECTS_DATA.fastapi.summary}</p>
              <button
                type="button"
                className="work-card-btn"
                onClick={() => onSelectProject('fastapi')}
              >
                See FastAPI Projects details
                <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
                  <path className="m-arrow__stem" d="M1 6h8" />
                  <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
                </svg>
              </button>

              <div
                className="panel"
                onClick={() => onSelectProject('fastapi')}
                style={{ cursor: 'pointer', marginTop: 'var(--s-5)' }}
              >
                <div className="stage">
                  <div
                    className="at-rise fit"
                    style={{ '--fit-max': '420px', '--ax': 'max(24px, 50% - 210px)', '--ay': '32px', '--ay-sm': '16px' } as React.CSSProperties}
                  >
                    <div className="ui ui-panel ui-pipe" data-ui="pipeline-board" data-ui-still="">
                      <div className="ui-pipe__head">
                        <svg className="ui-icon ui-pipe__branch" viewBox="0 0 16 16" aria-hidden="true">
                          <circle cx="4.5" cy="3.5" r="1.5" /><circle cx="4.5" cy="12.5" r="1.5" /><circle cx="11.5" cy="5" r="1.5" />
                          <path d="M4.5 5v6M11.5 6.5c0 2.6-2.2 3.6-5.6 4.6" />
                        </svg>
                        <span className="ui-pipe__repo">iTsukiyomi/fastapi-projects</span>
                        <i className="ui-pipe__slash">/</i>
                        <code className="ui-pipe__ref">main</code>
                        <span className="ui-spacer" />
                        <span className="ui-chip ui-chip--ink ui-pipe__chip" data-pipe-chip="" data-done="Ready">Ready</span>
                      </div>
                      <ol className="ui-pipe__steps">
                        <li className="ui-pipe__step is-done" data-step="search">
                          <span className="ui-pipe__ico"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 8.2 2.3 2.3 4.7-5" /></svg></span>
                          <span className="ui-pipe__name">
                            <span className="ui-pipe__tool" aria-hidden="true"><img src="assets/icons/python.svg" alt="" width={16} height={16} loading="lazy" /></span>
                            <span className="ui-pipe__nm">MangaDex CLI</span>
                          </span>
                          <code className="ui-pipe__cmd">search &amp; info</code>
                          <span className="ui-pipe__time" data-time="">Jikan API</span>
                          <span className="ui-pipe__bar"><i /></span>
                        </li>
                        <li className="ui-pipe__step is-done" data-step="compare">
                          <span className="ui-pipe__ico"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 8.2 2.3 2.3 4.7-5" /></svg></span>
                          <span className="ui-pipe__name">
                            <span className="ui-pipe__tool" aria-hidden="true"><img src="assets/icons/python.svg" alt="" width={16} height={16} loading="lazy" /></span>
                            <span className="ui-pipe__nm">Compare Charts</span>
                          </span>
                          <code className="ui-pipe__cmd">Pandas + MPL</code>
                          <span className="ui-pipe__time" data-time="">Cached</span>
                          <span className="ui-pipe__bar"><i /></span>
                        </li>
                        <li className="ui-pipe__step is-done" data-step="pokedex">
                          <span className="ui-pipe__ico"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 8.2 2.3 2.3 4.7-5" /></svg></span>
                          <span className="ui-pipe__name">
                            <span className="ui-pipe__tool" aria-hidden="true"><img src="assets/icons/fastapi.svg" alt="" width={16} height={16} loading="lazy" /></span>
                            <span className="ui-pipe__nm">Pokédex Server</span>
                          </span>
                          <code className="ui-pipe__cmd">GET / POST /team</code>
                          <span className="ui-pipe__time" data-time="">FastAPI</span>
                          <span className="ui-pipe__bar"><i /></span>
                        </li>
                        <li className="ui-pipe__step is-done" data-step="db">
                          <span className="ui-pipe__ico"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4.5 8.2 2.3 2.3 4.7-5" /></svg></span>
                          <span className="ui-pipe__name">
                            <span className="ui-pipe__tool" aria-hidden="true"><img src="assets/icons/sqlite.svg" alt="" width={16} height={16} loading="lazy" /></span>
                            <span className="ui-pipe__nm">Team Storage</span>
                          </span>
                          <code className="ui-pipe__cmd">SQLAlchemy</code>
                          <span className="ui-pipe__time" data-time="">team.db</span>
                          <span className="ui-pipe__bar"><i /></span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Dealt Moment 2: counter-rolls on real repo facts */}
          <div className="proof-strip" data-moment="counter-rolls">
            <div>
              <p className="t-stat">11</p>
              <p className="t-small muted">Redis commands in PyRedis</p>
            </div>
            <div>
              <p className="t-stat">18x18</p>
              <p className="t-small muted">Type chart in Dueler battle loop</p>
            </div>
            <div>
              <p className="t-stat">3</p>
              <p className="t-small muted">Factions in Mafioso Discord game</p>
            </div>
            <div>
              <p className="t-stat">100ms</p>
              <p className="t-small muted">Active key expiry loop in PyRedis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
