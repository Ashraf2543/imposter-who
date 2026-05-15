import { useState, useEffect, useRef } from "react";
import { WORD_BANK, CATEGORIES, getRandomWord, getRandomCategory } from "./data/words";

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function buildGame(players, selectedCategories, settings) {
  // Build combined pool from all selected categories
  const pool = selectedCategories.flatMap((cat) =>
    (WORD_BANK[cat] || []).map((word) => ({ word, category: cat }))
  );
  const picked = pool[Math.floor(Math.random() * pool.length)];
  const count = settings.trollMode
    ? players.length
    : Math.min(settings.numImposters, players.length - 1);
  const indices = shuffle([...Array(players.length).keys()]).slice(0, count);
  return { word: picked.word, category: picked.category, imposterIndices: indices };
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
);
const IconArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="18" height="18">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconTrophy = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
  </svg>
);

// ─── AVATAR ───────────────────────────────────────────────────────────────────
const Avatar = ({ name, index, size = 48 }) => {
  const colors = [
    "#ff6b6b","#ffd93d","#6bcb77","#4d96ff","#ff9a3c",
    "#c77dff","#48cae4","#f72585","#06d6a0","#fb5607",
  ];
  const color = colors[index % colors.length];
  const fontSize = size * 0.4;
  return (
    <div className="avatar" style={{ width: size, height: size, background: color, fontSize }}>
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  );
};

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────
function HomeScreen({ onPlay, onShowRules, scores }) {
  const [showScores, setShowScores] = useState(false);
  const total = scores.civilians + scores.imposters;

  return (
    <div className="screen home-screen">
      <div className="blobs">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      </div>
      <div className="home-inner">
        <div className="home-badge">PARTY · BLUFFING · DEDUCTION</div>
        <div className="home-logo-wrap">
          <div className="home-spy-icon">🕵️</div>
          <h1 className="home-title">
            IMPOSTER<br /><span className="accent-word">WHO?</span>
          </h1>
        </div>
        <p className="home-tagline">One secret word. One faker.<br />Can you spot the lie?</p>
        <button className="btn btn-primary btn-xl" onClick={onPlay}>
          Start Game
          <span className="btn-arrow"><IconArrowRight /></span>
        </button>
        <div className="home-links">
          <button className="text-btn" onClick={onShowRules}>📖 How to Play</button>
          {total > 0 && (
            <button className="text-btn" onClick={() => setShowScores(true)}>
              <IconTrophy /> Scoreboard
            </button>
          )}
        </div>
        <div className="home-stats">
          <div className="stat"><div className="stat-n">500+</div><div className="stat-l">Words</div></div>
          <div className="stat-div" />
          <div className="stat"><div className="stat-n">12</div><div className="stat-l">Categories</div></div>
          <div className="stat-div" />
          <div className="stat"><div className="stat-n">3–15</div><div className="stat-l">Players</div></div>
        </div>
      </div>
      {showScores && <ScoreModal scores={scores} onClose={() => setShowScores(false)} />}
    </div>
  );
}

// ─── RULES SCREEN ─────────────────────────────────────────────────────────────
function RulesScreen({ onBack }) {
  const steps = [
    { n: "01", icon: "👥", title: "Add Players", body: "3 to 15 players sit around one device and enter their names." },
    { n: "02", icon: "📲", title: "Get Your Role", body: "Pass the phone privately. Most players see the secret word. ONE player is the Imposter and sees nothing." },
    { n: "03", icon: "💬", title: "Give One Clue", body: "Each player says ONE word hinting at the secret word. The Imposter must fake it convincingly." },
    { n: "04", icon: "🤔", title: "Discuss", body: "Debate who seemed suspicious, too vague, or too obvious. Use multiple rounds if needed." },
    { n: "05", icon: "🗳️", title: "Vote!", body: "Everyone votes for the suspected Imposter. Majority wins. Then the truth is revealed!" },
  ];
  return (
    <div className="screen scroll-screen">
      <div className="screen-header">
        <button className="btn btn-icon" onClick={onBack}><IconArrowLeft /></button>
        <h2>How to Play</h2>
        <div style={{ width: 40 }} />
      </div>
      <div className="rules-body">
        {steps.map((s) => (
          <div className="rule-row" key={s.n}>
            <div className="rule-num-badge">{s.n}</div>
            <div>
              <div className="rule-title">{s.icon} {s.title}</div>
              <div className="rule-desc">{s.body}</div>
            </div>
          </div>
        ))}
        <div className="rules-win-section">
          <div className="section-label">🏆 Winning</div>
          <div className="win-card w-civilians">
            <div className="win-role">😇 Civilians Win</div>
            <div className="win-how">Vote out the Imposter correctly.</div>
          </div>
          <div className="win-card w-imposters">
            <div className="win-role">🕵️ Imposter Wins</div>
            <div className="win-how">Avoid detection — OR correctly guess the secret word after being caught.</div>
          </div>
        </div>
        <div className="tip-box">
          <span className="tip-tag">🔥 Pro Tip</span> Be specific enough to prove knowledge — but not so specific you give it away to the Imposter!
        </div>
      </div>
    </div>
  );
}

// ─── PLAYER SETUP SCREEN ──────────────────────────────────────────────────────
function PlayerSetupScreen({ onNext, onBack }) {
  const [names, setNames] = useState(["", ""]);
  const [error, setError] = useState("");
  const refs = useRef([]);

  const add = () => {
    if (names.length >= 15) return;
    setNames((n) => [...n, ""]);
    setTimeout(() => refs.current[names.length]?.focus(), 60);
  };

  const remove = (i) => {
    if (names.length <= 2) return;
    setNames((n) => n.filter((_, idx) => idx !== i));
  };

  const update = (i, v) => {
    setNames((n) => { const c = [...n]; c[i] = v; return c; });
    if (error) setError("");
  };

  const next = () => {
    const filled = names.map((n) => n.trim()).filter(Boolean);
    if (filled.length < 3) return setError("Need at least 3 players!");
    if (new Set(filled.map((n) => n.toLowerCase())).size !== filled.length)
      return setError("Names must be unique!");
    onNext(filled);
  };

  return (
    <div className="screen scroll-screen">
      <div className="screen-header">
        <button className="btn btn-icon" onClick={onBack}><IconArrowLeft /></button>
        <h2>Add Players</h2>
        <div className="pill">{names.filter((n) => n.trim()).length}/15</div>
      </div>
      <div className="setup-body">
        <p className="hint-text">Enter everyone's name (min 3, max 15)</p>
        <div className="player-list">
          {names.map((name, i) => (
            <div className="input-row" key={i}>
              <Avatar name={name || String(i + 1)} index={i} size={38} />
              <input
                ref={(el) => (refs.current[i] = el)}
                className="text-input"
                type="text"
                placeholder={`Player ${i + 1}`}
                value={name}
                maxLength={18}
                onChange={(e) => update(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") i === names.length - 1 ? add() : refs.current[i + 1]?.focus();
                }}
              />
              {names.length > 2 && (
                <button className="btn btn-icon btn-danger" onClick={() => remove(i)}>
                  <IconTrash />
                </button>
              )}
            </div>
          ))}
        </div>
        {names.length < 15 && (
          <button className="btn btn-dashed" onClick={add}>
            <IconPlus /> Add Player
          </button>
        )}
        {error && <div className="error-pill">{error}</div>}
      </div>
      <div className="footer">
        <button className="btn btn-primary btn-lg" onClick={next}>
          Choose Category <IconArrowRight />
        </button>
      </div>
    </div>
  );
}

// ─── CATEGORY SCREEN ──────────────────────────────────────────────────────────
function CategoryScreen({ players, onStart, onBack }) {
  const [selectedCats, setSelectedCats] = useState([...CATEGORIES]); // all selected by default
  const [settings, setSettings] = useState({
    numImposters: 1, trollMode: false, timerEnabled: false, timerSeconds: 30, hintEnabled: false,
  });
  const [error, setError] = useState("");

  const toggle = (k) => setSettings((s) => ({ ...s, [k]: !s[k] }));
  const maxImposters = Math.max(1, Math.floor(players.length / 2));
  const allSelected = selectedCats.length === CATEGORIES.length;

  const toggleCat = (cat) => {
    setError("");
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleStart = () => {
    if (selectedCats.length === 0) { setError("Select at least one category!"); return; }
    onStart(selectedCats, settings);
  };

  return (
    <div className="screen scroll-screen">
      <div className="screen-header">
        <button className="btn btn-icon" onClick={onBack}><IconArrowLeft /></button>
        <h2>Game Setup</h2>
        <div className="pill">{players.length} players</div>
      </div>
      <div className="cat-body">
        <div className="cat-section-header">
          <div className="section-label" style={{ margin: 0 }}>Categories</div>
          <div className="cat-header-actions">
            <span className="cat-count-pill">{selectedCats.length}/{CATEGORIES.length}</span>
            <button className="text-btn" style={{ fontSize: 12 }}
              onClick={() => setSelectedCats(allSelected ? [] : [...CATEGORIES])}>
              {allSelected ? "Clear all" : "Select all"}
            </button>
          </div>
        </div>
        <p className="hint-text" style={{ marginBottom: 10 }}>
          Tap to select which categories to include. Word is picked randomly from your selection.
        </p>
        <div className="cat-grid">
          {CATEGORIES.map((c) => {
            const active = selectedCats.includes(c);
            return (
              <button key={c} className={`cat-chip ${active ? "active" : ""}`} onClick={() => toggleCat(c)}>
                {active && <span className="cat-tick"><IconCheck /></span>}
                {c}
              </button>
            );
          })}
        </div>
        {error && <div className="error-pill" style={{ marginTop: 10 }}>{error}</div>}

        <div className="section-label" style={{ marginTop: 28 }}>Settings</div>
        <div className="settings-list">
          <div className="setting-row">
            <div>
              <div className="sr-name">🕵️ Imposters</div>
              <div className="sr-desc">How many fakers?</div>
            </div>
            <div className="stepper">
              <button className="step-btn" disabled={settings.numImposters <= 1 || settings.trollMode}
                onClick={() => setSettings((s) => ({ ...s, numImposters: s.numImposters - 1 }))}>−</button>
              <span className="step-val">{settings.trollMode ? "ALL" : settings.numImposters}</span>
              <button className="step-btn" disabled={settings.numImposters >= maxImposters || settings.trollMode}
                onClick={() => setSettings((s) => ({ ...s, numImposters: s.numImposters + 1 }))}>+</button>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <div className="sr-name">🃏 Troll Mode</div>
              <div className="sr-desc">Everyone is the Imposter</div>
            </div>
            <button className={`toggle-btn ${settings.trollMode ? "on" : ""}`} onClick={() => toggle("trollMode")}>
              <div className="toggle-knob" />
            </button>
          </div>

          <div className="setting-row">
            <div>
              <div className="sr-name">⏱ Turn Timer</div>
              <div className="sr-desc">Limit each clue time</div>
            </div>
            <button className={`toggle-btn ${settings.timerEnabled ? "on" : ""}`} onClick={() => toggle("timerEnabled")}>
              <div className="toggle-knob" />
            </button>
          </div>

          {settings.timerEnabled && (
            <div className="setting-row sub-row">
              <div className="sr-name" style={{ fontSize: 13 }}>Seconds per turn</div>
              <div className="time-chips">
                {[15, 20, 30, 45, 60].map((t) => (
                  <button key={t} className={`time-chip ${settings.timerSeconds === t ? "active" : ""}`}
                    onClick={() => setSettings((s) => ({ ...s, timerSeconds: t }))}>
                    {t}s
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="setting-row">
            <div>
              <div className="sr-name">💡 Imposter Hint</div>
              <div className="sr-desc">Show the Imposter a subtle category hint</div>
            </div>
            <button className={`toggle-btn ${settings.hintEnabled ? "on" : ""}`} onClick={() => toggle("hintEnabled")}>
              <div className="toggle-knob" />
            </button>
          </div>
        </div>
      </div>
      <div className="footer">
        <button className="btn btn-primary btn-lg" onClick={handleStart}>
          Start Game <IconArrowRight />
        </button>
      </div>
    </div>
  );
}

// ─── REVEAL SCREEN ────────────────────────────────────────────────────────────
function RoleRevealScreen({ players, gameData, settings, onGameStart, onBack }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const isImposter = gameData.imposterIndices.includes(idx);

  const next = () => {
    if (idx < players.length - 1) { setIdx(idx + 1); setRevealed(false); }
    else setAllDone(true);
  };

  if (allDone) return (
    <div className="screen home-screen">
      <div className="blobs"><div className="blob b1" /><div className="blob b2" /></div>
      <div className="home-inner" style={{ gap: 20 }}>
        <div style={{ fontSize: 72 }}>🎭</div>
        <h2 style={{ color: "var(--text)", textAlign: "center" }}>Everyone's Ready!</h2>
        <p style={{ color: "var(--muted)", textAlign: "center", lineHeight: 1.6 }}>
          The Imposter is hiding among you.<br />Choose who goes first and start!
        </p>
        <button className="btn btn-primary btn-xl" onClick={onGameStart}>
          Begin Discussion <IconArrowRight />
        </button>
        <button className="text-btn" onClick={onBack}>← Back to Setup</button>
      </div>
    </div>
  );

  return (
    <div className="screen reveal-screen">
      <div className="reveal-progress-bar">
        {players.map((_, i) => (
          <div key={i} className={`rp-dot ${i < idx ? "done" : i === idx ? "active" : ""}`} />
        ))}
      </div>
      <p className="reveal-pass-hint">Pass the phone to <strong>{players[idx]}</strong></p>
      <div className="card-area">
        {!revealed ? (
          <div className="cover-card" onClick={() => setRevealed(true)}>
            <Avatar name={players[idx]} index={idx} size={72} />
            <div className="cover-name">{players[idx]}</div>
            <div className="cover-tap">👁 Tap to reveal your role</div>
            <div className="cover-warn">⚠️ Make sure no one else can see!</div>
          </div>
        ) : (
          <div className={`role-card ${isImposter ? "role-imposter" : "role-civilian"}`}>
            <div className="role-big-icon">{isImposter ? "🕵️" : "😇"}</div>
            <div className="role-title-text">{isImposter ? "IMPOSTER" : "CIVILIAN"}</div>
            {!isImposter && (
              <div className="role-word-area">
                <div className="role-cat-label">{gameData.category}</div>
                <div className="role-secret-word">{gameData.word}</div>
              </div>
            )}
            {isImposter && (
              <div className="imposter-msg">
                Blend in and fake your clue.<br />
                <span className="imposter-sub">You don't know the word — but guess it correctly if caught!</span>
                {settings?.hintEnabled && (
                  <div className="imposter-hint-box">
                    <span className="hint-label">💡 Hint</span>
                    <span className="hint-value">The word is in <strong>{gameData.category}</strong></span>
                  </div>
                )}
              </div>
            )}
            <div className="role-card-actions">
              <button className="btn btn-ghost-sm" onClick={() => setRevealed(false)}>
                <IconEyeOff /> Hide
              </button>
              <button className="btn btn-primary" onClick={next}>
                {idx < players.length - 1 ? `Done — Pass to ${players[idx + 1]}` : "All Done!"} <IconArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PLAYING SCREEN ───────────────────────────────────────────────────────────
function PlayingScreen({ players, gameData, settings, onVote, onBack }) {
  const [current, setCurrent] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(settings.timerSeconds);
  const [running, setRunning] = useState(false);
  const [roundDone, setRoundDone] = useState(false);
  const [notes, setNotes] = useState({});
  const [showNotes, setShowNotes] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setRunning(false);
    }
    return () => clearInterval(timerRef.current);
  }, [running, timeLeft]);

  const nextPlayer = () => {
    if (current < players.length - 1) {
      setCurrent(current + 1);
      if (settings.timerEnabled) { setTimeLeft(settings.timerSeconds); setRunning(false); clearInterval(timerRef.current); }
    } else {
      setRoundDone(true);
      setRunning(false);
    }
  };

  const timerPct = settings.timerSeconds > 0 ? (timeLeft / settings.timerSeconds) * 100 : 100;
  const timerColor = timeLeft > settings.timerSeconds * 0.5 ? "#4ade80" : timeLeft > settings.timerSeconds * 0.25 ? "#fbbf24" : "#f87171";
  const R = 34;
  const circ = 2 * Math.PI * R;

  return (
    <div className="screen playing-screen">
      <div className="screen-header">
        <button className="btn btn-icon" onClick={onBack}><IconArrowLeft /></button>
        <div className="round-badge">Round {round}</div>
        <button className="btn btn-icon" onClick={() => setShowNotes(true)}>📝</button>
      </div>

      {roundDone ? (
        <div className="round-done">
          <div style={{ fontSize: 56 }}>🗣️</div>
          <h3>Round {round} done!</h3>
          <p>Keep discussing or vote now.</p>
          <div className="rd-actions">
            <button className="btn btn-outline" onClick={() => { setCurrent(0); setRound(r => r + 1); setRoundDone(false); if (settings.timerEnabled) { setTimeLeft(settings.timerSeconds); setRunning(false); } }}>
              Another Round
            </button>
            <button className="btn btn-primary" onClick={onVote}>Vote Now 🗳️</button>
          </div>
        </div>
      ) : (
        <div className="playing-body">
          <div className="current-card">
            <div className="cc-label">Now giving a clue</div>
            <Avatar name={players[current]} index={current} size={72} />
            <div className="cc-name">{players[current]}</div>
            {settings.timerEnabled && (
              <div className="timer-wrap">
                <div className="timer-ring-wrap">
                  <svg width="88" height="88" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r={R} fill="none" stroke="#1e1e30" strokeWidth="7" />
                    <circle cx="40" cy="40" r={R} fill="none" stroke={timerColor} strokeWidth="7"
                      strokeDasharray={circ} strokeDashoffset={circ * (1 - timerPct / 100)}
                      strokeLinecap="round" transform="rotate(-90 40 40)"
                      style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }} />
                  </svg>
                  <div className="timer-num" style={{ color: timerColor }}>{timeLeft}</div>
                </div>
                <button className="btn btn-sm" onClick={() => { if (running) { clearInterval(timerRef.current); setRunning(false); } else { setTimeLeft(settings.timerSeconds); setRunning(true); } }}>
                  {running ? "⏸ Pause" : "▶ Start"}
                </button>
              </div>
            )}
          </div>
          <div className="player-queue">
            {players.map((p, i) => (
              <div key={i} className={`pq-item ${i === current ? "pq-current" : i < current ? "pq-done" : ""}`}>
                <Avatar name={p} index={i} size={32} />
                <span className="pq-name">{p}</span>
                {i < current && <span className="pq-check" style={{ color: "#4ade80" }}><IconCheck /></span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {!roundDone && (
        <div className="footer">
          <button className="btn btn-primary btn-lg" onClick={nextPlayer}>
            {current < players.length - 1 ? `Next: ${players[current + 1]}` : "End Round"} <IconArrowRight />
          </button>
          <button className="text-btn small" onClick={onVote}>Skip to Vote →</button>
        </div>
      )}

      {showNotes && (
        <div className="overlay" onClick={() => setShowNotes(false)}>
          <div className="notes-panel" onClick={(e) => e.stopPropagation()}>
            <div className="notes-hdr">
              <span>📝 Notes</span>
              <button className="btn btn-icon" onClick={() => setShowNotes(false)}>✕</button>
            </div>
            {players.map((p, i) => (
              <div className="note-row" key={i}>
                <Avatar name={p} index={i} size={32} />
                <input className="text-input" placeholder={`Notes on ${p}...`}
                  value={notes[p] || ""} onChange={(e) => setNotes({ ...notes, [p]: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── VOTING SCREEN ────────────────────────────────────────────────────────────
function VotingScreen({ players, onResult, onBack }) {
  const [votes, setVotes] = useState({});
  const [voterIdx, setVoterIdx] = useState(0);
  const [pick, setPick] = useState(null);
  const [allDone, setAllDone] = useState(false);

  const voter = players[voterIdx];

  const cast = () => {
    if (!pick) return;
    const newVotes = { ...votes, [voter]: pick };
    setVotes(newVotes);
    if (voterIdx < players.length - 1) { setVoterIdx(v => v + 1); setPick(null); }
    else setAllDone(true);
  };

  const tally = players.reduce((a, p) => ({ ...a, [p]: 0 }), {});
  Object.values(votes).forEach((v) => (tally[v] = (tally[v] || 0) + 1));
  const maxVote = Math.max(...Object.values(tally));

  if (allDone) return (
    <div className="screen scroll-screen">
      <div className="screen-header">
        <div />
        <h2>🗳️ Vote Tally</h2>
        <div />
      </div>
      <div className="tally-body">
        {players.sort((a, b) => tally[b] - tally[a]).map((p, i) => (
          <div key={p} className="tally-row">
            <Avatar name={p} index={players.indexOf(p)} size={36} />
            <span className="tally-name">{p}</span>
            <div className="tally-bar-wrap">
              <div className="tally-bar" style={{ width: `${maxVote ? (tally[p] / maxVote) * 100 : 0}%`, background: tally[p] === maxVote && maxVote > 0 ? "#ff6b6b" : "#2a2a3e" }} />
            </div>
            <span className="tally-num">{tally[p]}</span>
          </div>
        ))}
        <button className="btn btn-primary btn-lg" style={{ marginTop: 24 }} onClick={() => onResult(votes)}>
          Reveal Imposter 🎭
        </button>
      </div>
    </div>
  );

  return (
    <div className="screen scroll-screen">
      <div className="screen-header">
        <button className="btn btn-icon" onClick={onBack}><IconArrowLeft /></button>
        <h2>Vote</h2>
        <div className="pill">{voterIdx + 1}/{players.length}</div>
      </div>
      <div className="vote-body">
        <div className="vote-who">
          <Avatar name={voter} index={voterIdx} size={52} />
          <p><strong>{voter}</strong>, who do you suspect?</p>
        </div>
        <div className="candidate-list">
          {players.filter((p) => p !== voter).map((p) => (
            <button key={p} className={`candidate-row ${pick === p ? "selected" : ""}`} onClick={() => setPick(p)}>
              <Avatar name={p} index={players.indexOf(p)} size={38} />
              <span className="cand-name">{p}</span>
              {pick === p && <span className="cand-tick" style={{ color: "#4ade80" }}><IconCheck /></span>}
            </button>
          ))}
        </div>
      </div>
      <div className="footer">
        <button className="btn btn-primary btn-lg" onClick={cast} disabled={!pick}>
          Cast Vote <IconArrowRight />
        </button>
      </div>
    </div>
  );
}

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────
function ResultScreen({ players, gameData, votes, onPlayAgain, onHome, onUpdateScores }) {
  const [revealed, setRevealed] = useState(false);
  const [scored, setScored] = useState(false);

  // Build tally
  const tally = players.reduce((a, p) => ({ ...a, [p]: 0 }), {});
  Object.values(votes).forEach((v) => { tally[v] = (tally[v] || 0) + 1; });

  // Sort players by votes descending for display
  const sorted = [...players].sort((a, b) => tally[b] - tally[a]);
  const mostVoted = sorted[0];
  const maxVotes = tally[mostVoted];

  const actualImposters = gameData.imposterIndices.map((i) => players[i]);

  // ✅ Fixed: civilians win if ANY actual imposter has the most votes (handles ties)
  const caughtCorrectly = actualImposters.some((imp) => tally[imp] === maxVotes);

  const handleReveal = () => {
    setRevealed(true);
    if (!scored) { onUpdateScores(caughtCorrectly ? "civilians" : "imposters"); setScored(true); }
  };

  return (
    <div className="screen scroll-screen">
      <div className="screen-header">
        <div />
        <h2>Results</h2>
        <div />
      </div>
      <div className="result-body">

        {/* Vote breakdown — always visible */}
        <div className="vote-breakdown-card">
          <div className="vbc-title">🗳️ Vote Breakdown</div>
          {sorted.map((p) => {
            const isImp = actualImposters.includes(p);
            const pct = maxVotes > 0 ? (tally[p] / players.length) * 100 : 0;
            return (
              <div key={p} className={`vbc-row ${isImp && revealed ? "vbc-imposter" : ""}`}>
                <Avatar name={p} index={players.indexOf(p)} size={30} />
                <span className="vbc-name">{p}</span>
                <div className="vbc-bar-wrap">
                  <div className="vbc-bar" style={{
                    width: `${pct}%`,
                    background: isImp && revealed ? "var(--accent)" : "var(--blue)"
                  }} />
                </div>
                <span className="vbc-count">{tally[p]}</span>
                {isImp && revealed && <span className="vbc-spy">🕵️</span>}
              </div>
            );
          })}
        </div>

        {!revealed ? (
          <button className="btn btn-primary btn-xl" onClick={handleReveal}>
            Reveal Imposter 🎭
          </button>
        ) : (
          <div className="reveal-area">
            <div className={`verdict ${caughtCorrectly ? "v-win" : "v-lose"}`}>
              {caughtCorrectly ? "🎉 Civilians Win!" : "🕵️ Imposter Wins!"}
            </div>

            <div className="result-explain">
              {caughtCorrectly
                ? `The group correctly voted out ${actualImposters.join(" & ")}!`
                : mostVoted && actualImposters.includes(mostVoted)
                  ? `It was a tie — the Imposter slipped through!`
                  : `The Imposter fooled everyone. ${actualImposters.join(" & ")} got away!`
              }
            </div>

            <div className="actual-row">
              <span className="actual-label">The Imposter{actualImposters.length > 1 ? "s were" : " was"}</span>
              <span className="actual-names">{actualImposters.join(", ")}</span>
            </div>

            <div className="word-reveal-box">
              <div className="wrb-label">The Secret Word</div>
              <div className="wrb-word">{gameData.word}</div>
              <div className="wrb-cat">{gameData.category}</div>
            </div>

            <div className="result-actions">
              <button className="btn btn-primary btn-lg" onClick={onPlayAgain}>Play Again</button>
              <button className="btn btn-ghost" onClick={onHome}><IconHome /> Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCORE MODAL ──────────────────────────────────────────────────────────────
function ScoreModal({ scores, onClose }) {
  const total = scores.civilians + scores.imposters;
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>🏆 Scoreboard</h3>
        <div className="score-row">
          <span>😇 Civilians</span>
          <div className="score-bar-wrap">
            <div className="score-bar" style={{ width: total ? `${(scores.civilians / total) * 100}%` : "50%", background: "#4ade80" }} />
          </div>
          <span className="score-num">{scores.civilians}</span>
        </div>
        <div className="score-row">
          <span>🕵️ Imposters</span>
          <div className="score-bar-wrap">
            <div className="score-bar" style={{ width: total ? `${(scores.imposters / total) * 100}%` : "50%", background: "#ff6b6b" }} />
          </div>
          <span className="score-num">{scores.imposters}</span>
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 12 }}>{total} round{total !== 1 ? "s" : ""} played</p>
        <button className="btn btn-ghost" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [players, setPlayers] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [settings, setSettings] = useState({ numImposters: 1, trollMode: false, timerEnabled: false, timerSeconds: 30 });
  const [votes, setVotes] = useState({});
  const [scores, setScores] = useState({ civilians: 0, imposters: 0 });

  const go = (s) => setScreen(s);

  return (
    <div className="app">
      {screen === "home" && <HomeScreen onPlay={() => go("setup")} onShowRules={() => go("rules")} scores={scores} />}
      {screen === "rules" && <RulesScreen onBack={() => go("home")} />}
      {screen === "setup" && (
        <PlayerSetupScreen onNext={(p) => { setPlayers(p); go("category"); }} onBack={() => go("home")} />
      )}
      {screen === "category" && (
        <CategoryScreen players={players} onStart={(cats, s) => {
          setSettings(s);
          setGameData(buildGame(players, cats, s));
          go("reveal");
        }} onBack={() => go("setup")} />
      )}
      {screen === "reveal" && gameData && (
        <RoleRevealScreen players={players} gameData={gameData} settings={settings} onGameStart={() => go("playing")} onBack={() => go("category")} />
      )}
      {screen === "playing" && (
        <PlayingScreen players={players} gameData={gameData} settings={settings} onVote={() => go("voting")} onBack={() => go("reveal")} />
      )}
      {screen === "voting" && (
        <VotingScreen players={players} onResult={(v) => { setVotes(v); go("result"); }} onBack={() => go("playing")} />
      )}
      {screen === "result" && gameData && (
        <ResultScreen
          players={players} gameData={gameData} votes={votes}
          onPlayAgain={() => { setGameData(null); setVotes({}); go("setup"); }}
          onHome={() => { setGameData(null); setVotes({}); go("home"); }}
          onUpdateScores={(winner) => setScores((s) => ({ ...s, [winner]: s[winner] + 1 }))}
        />
      )}
    </div>
  );
}
