// --- IMPORTA TUTTI I TUOI JSON ---
import in1_df from "../../inazuma1/df.json";
import in1_fw from "../../inazuma1/fw.json";
import in1_gk from "../../inazuma1/gk.json";
import in1_mf from "../../inazuma1/mf.json";
import in2_df from "../../inazuma2/df.json";
import in2_fw from "../../inazuma2/fw.json";
import in2_gk from "../../inazuma2/gk.json";
import in2_mf from "../../inazuma2/mf.json";
import in3_df from "../../inazuma3/df.json";
import in3_fw from "../../inazuma3/fw.json";
import in3_gk from "../../inazuma3/gk.json";
import in3_mf from "../../inazuma3/mf.json";

const rawPlayers = [
    ...in1_df, ...in1_fw, ...in1_gk, ...in1_mf,
    ...in2_df, ...in2_fw, ...in2_gk, ...in2_mf,
    ...in3_df, ...in3_fw, ...in3_gk, ...in3_mf
];

// 1. Converte i ruoli in quelli che il gioco capisce
const mapRole = (ruolo) => {
    const r = ruolo?.toLowerCase();
    if (r === "portiere") return "GK";
    if (r === "difensore") return "DF";
    if (r === "centrocampista") return "MF";
    if (r === "attaccante") return "FW";
    return "ANY";
};

// 2. Prende solo il nome del file (es. Apollo-inazuma-1.webp) e lo cerca in /img/
const fixPath = (path) => {
    if (!path) return "";
    const fileName = path.split(/[\\/]/).pop(); // Estrae solo la parte finale dopo l'ultimo slash o backslash
    return `/img/${fileName}`;
};

export const players = rawPlayers.map(p => ({
    name: p.personaggio,
    role: mapRole(p.ruolo),
    image: fixPath(p.link_immagine)
}));