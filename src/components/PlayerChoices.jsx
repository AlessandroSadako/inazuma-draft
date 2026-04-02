export default function PlayerChoices({ choices, onPick }) {
    if (choices.length === 0) return null;

    return (
        <div className="choices-vertical-list">
            <h3 className="fs-6 text-center text-uppercase border-bottom pb-2 mb-3">Scegli</h3>
            {choices.map((p, i) => (
                <div
                    key={i}
                    className="choice-card-vertical"
                    onClick={() => onPick(p)}
                >
                    <img src={p.image} alt={p.name} />
                    <p className="mb-0 mt-2 fw-bold" style={{fontSize: '11px'}}>{p.name}</p>
                </div>
            ))}
        </div>
    );
}