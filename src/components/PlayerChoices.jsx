import PlayerCard from "./PlayerCard";

export default function PlayerChoices({ choices, onPick }) {
    if (choices.length === 0) return null;

    return (
        <>
            {choices.map((p, i) => (
                <PlayerCard
                    key={i}
                    player={p}
                    onClick={() => onPick(p)}
                />
            ))}
        </>
    );
}