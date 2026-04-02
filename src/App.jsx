import { useState } from "react";
import { formations } from "./data/formations";
import { players } from "./data/players";

import FormationSelect from "./components/FormationSelect";
import Field from "./components/Field";
import PlayerChoices from "./components/PlayerChoices";
import Bench from "./components/Bench";

function App() {
  const [formation, setFormation] = useState(null);
  const [team, setTeam] = useState([]);
  const [bench, setBench] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [usedPlayers, setUsedPlayers] = useState([]);
  const [currentPick, setCurrentPick] = useState(0);

  // 🎯 GENERA SCELTE
  const getChoices = (role) => {
    let filtered = players.filter(p =>
      (role === "ANY" || p.role === role) &&
      !usedPlayers.includes(p.name)
    );

    return filtered.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  // 🟢 CLICK POSIZIONE
  const handlePositionClick = (role, index) => {
    const c = getChoices(role);
    setChoices(c);
    setSelectedIndex(index);
  };

  // 🟢 SCELTA GIOCATORE
  const pickPlayer = (player) => {
    if (selectedIndex === null) return;

    const newTeam = [...team];
    newTeam[selectedIndex] = player;

    setTeam(newTeam);
    setUsedPlayers([...usedPlayers, player.name]);
    setChoices([]);

    setCurrentPick(prev => prev + 1); // 🔥 QUESTO È NUOVO
  };

  // 🟣 PANCHINA
  const draftBench = () => {
    const c = getChoices("ANY");
    setChoices(c);
    setSelectedIndex("bench");
  };

  const pickBench = (player) => {
    setBench([...bench, player]);
    setUsedPlayers([...usedPlayers, player.name]);
    setChoices([]);
  };

  return (
    <div className="container text-center mt-4">

      <FormationSelect
        formations={formations}
        onSelect={(f) => {
          setFormation(f);
          setTeam(new Array(f.positions.length).fill(null)); // 🔥 QUESTO
        }}
      />

      {formation && (
        <>
          <h2>{formation.name}</h2>

          <button
            className="btn btn-success mt-3"
            onClick={() => {
              const role = formation.positions[currentPick].role;
              const c = getChoices(role);

              setChoices(c);
              setSelectedIndex(currentPick);
            }}
          >
            Draft Next
          </button>
          <Field
            formation={formation}
            team={team}
            onPositionClick={handlePositionClick}
          />

          <button
            className="btn btn-primary mt-3"
            onClick={draftBench}
          >
            Draft Panchina
          </button>

          <Bench bench={bench} />

          <PlayerChoices
            choices={choices}
            onPick={selectedIndex === "bench" ? pickBench : pickPlayer}
          />
        </>
      )}
    </div>
  );
}

export default App;