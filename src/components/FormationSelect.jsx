export default function FormationSelect({ formations, onSelect }) {

    const random = formations.sort(() => 0.5 - Math.random()).slice(0, 3);

    return (
        <div>
            <h2>Scegli formazione</h2>
            <div className="d-flex justify-content-center gap-3">
                {random.map((f, i) => (
                    <button
                        key={i}
                        className="btn btn-success"
                        onClick={() => onSelect(f)}
                    >
                        {f.name}
                    </button>
                ))}
            </div>
        </div>
    );
}