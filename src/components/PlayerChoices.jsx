export default function PlayerChoices({ choices, onPick }) {
    if (choices.length === 0) return null;

    return (
        <div className="mt-4">
            <h3>Scegli giocatore</h3>

            <div className="d-flex justify-content-center gap-3">
                {choices.map((p, i) => (
                    <div
                        key={i}
                        className="border p-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => onPick(p)}
                    >
                        <img src={p.image} width="80" />
                        <p>{p.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}