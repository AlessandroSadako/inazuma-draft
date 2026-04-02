export default function Field({ formation, team, currentPick }) {
    if (!formation?.positions) return null;

    return (
        <div className="field">
            {formation.positions.map((pos, index) => {
                const isActive = index === currentPick;

                return (
                    <div
                        key={index}
                        className="player-slot"
                        style={{
                            top: `${pos.y}%`,
                            left: `${pos.x}%`
                        }}
                    >
                        {team[index] ? (
                            <img
                                src={team[index].image}
                                className="player-img"
                            />
                        ) : (
                            <div
                                className="placeholder"
                                style={{
                                    backgroundColor: isActive ? "blue" : "red"
                                }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}