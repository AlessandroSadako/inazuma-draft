import { useState } from "react";
import { formations } from "./data/formations";
import { players } from "./data/players";

import Field from "./components/Field";
import PlayerChoices from "./components/PlayerChoices";

function App() {
  const [gameState, setGameState] = useState("START");
  const [randomFormations, setRandomFormations] = useState([]);
  const [formation, setFormation] = useState(null);
  const [team, setTeam] = useState([]);
  const [bench, setBench] = useState(new Array(5).fill(null));
  const [choices, setChoices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [usedPlayers, setUsedPlayers] = useState([]);
  const [currentPick, setCurrentPick] = useState(0);

  const benchSequence = ["GK", "FW", "FW", "DF", "MF"];

  const startSelecting = () => {
    const shuffled = [...formations].sort(() => Math.random() - 0.5);
    setRandomFormations(shuffled.slice(0, 3));
    setGameState("SELECTING");
  };

  const startGame = (f) => {
    setFormation(f);
    setTeam(new Array(f.positions.length).fill(null));
    setBench(new Array(5).fill(null));
    setCurrentPick(0);
    setUsedPlayers([]);
    setGameState("PLAYING");
  };

  const getChoices = (role) => {
    let filtered = players.filter(p =>
      (role === "ANY" || p.role === role) &&
      !usedPlayers.includes(p.name)
    );
    return filtered.sort(() => Math.random() - 0.5).slice(0, 3);
  };

  const handleNextDraft = () => {
    let role = "";
    let index = null;

    if (currentPick < formation.positions.length) {
      role = formation.positions[currentPick].role;
      index = currentPick;
    } else if (currentPick < formation.positions.length + 5) {
      const benchIdx = currentPick - formation.positions.length;
      role = benchSequence[benchIdx];
      index = `bench-${benchIdx}`;
    } else return;

    setChoices(getChoices(role));
    setSelectedIndex(index);
  };

  const pickPlayer = (player) => {
    if (selectedIndex === null) return;

    const newPlayer = { ...player, justPicked: true };

    if (typeof selectedIndex === "string") {
      const idx = parseInt(selectedIndex.split("-")[1]);
      const newBench = [...bench];
      newBench[idx] = newPlayer;
      setBench(newBench);
    } else {
      const newTeam = [...team];
      newTeam[selectedIndex] = newPlayer;
      setTeam(newTeam);
    }

    setUsedPlayers([...usedPlayers, player.name]);
    setChoices([]);
    setSelectedIndex(null);
    setCurrentPick(prev => prev + 1);

    // rimuove animazione
    setTimeout(() => {
      setTeam(prev =>
        prev.map(p => p ? { ...p, justPicked: false } : p)
      );
      setBench(prev =>
        prev.map(p => p ? { ...p, justPicked: false } : p)
      );
    }, 400);
  };

  // --- START SCREEN ---
  if (gameState === "START") {
    return (
      <div className="start-screen">
        <h1 className="main-title">INAZUMA DRAFT</h1>
        <button className="play-now-btn" onClick={startSelecting}>
          PLAY NOW
        </button>
      </div>
    );
  }

  // --- SELECT FORMATION ---
  if (gameState === "SELECTING") {
    return (
      <div className="selection-screen">
        <h2 className="mb-5 text-uppercase fw-bold">
          Scegli il tuo Modulo
        </h2>

        <div className="formation-grid">
          {randomFormations.map((f, i) => (
            <div
              key={i}
              className="formation-card"
              onClick={() => startGame(f)}
            >
              <h3>{f.name}</h3>

              <div className="mini-field">
                <div className="field-line mediana"></div>
                <div className="field-line cerchio"></div>

                {f.positions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="mini-dot"
                    style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                  />
                ))}
              </div>

              <button className="select-btn">SELEZIONA</button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- GAME ---
  return (
    <div className="container">
      <div className="game-layout">

        <div className="field-section">
          <h2 className="formation-title">{formation.name}</h2>

          <button
            className="btn-draft-next mb-3"
            disabled={currentPick >= formation.positions.length + 5}
            onClick={handleNextDraft}
          >
            {currentPick < formation.positions.length
              ? "Draft Next"
              : "Draft Bench"}
          </button>

          <Field
            formation={formation}
            team={team}
            onPositionClick={(role, idx) => {
              setChoices(getChoices(role));
              setSelectedIndex(idx);
            }}
            selectedIndex={selectedIndex}
          />
        </div>

        <div className="subs-section">
          <h3 className="fs-6 text-uppercase mb-3">Panchina</h3>

          <div className="subs-list">
            {bench.map((player, i) => (
              <div
                key={i}
                className={`sub-slot ${selectedIndex === `bench-${i}` ? "active-slot" : ""
                  }`}
              >
                {player ? (
                  <img src={player.image} className="player-img-small" />
                ) : (
                  <div className="placeholder-small"></div>
                )}
                <span className="sub-role-label">
                  {benchSequence[i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 OVERLAY */}
      {choices.length > 0 && (
        <div className="choices-overlay">
          <div className="choices-container">
            <PlayerChoices choices={choices} onPick={pickPlayer} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;