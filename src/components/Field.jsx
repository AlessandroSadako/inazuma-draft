export default function Field({ formation, team, onPositionClick, selectedIndex }) {
    if (!formation?.positions) return null;

    return (
        <div className="field">
            {formation.positions.map((pos, index) => {
                const isActive = index === selectedIndex;

                return (
                    <div
                        key={index}
                        className="player-slot"
                        onClick={() => {
                            if (team[index]) return;
                            onPositionClick(pos.role, index);
                        }}
                        style={{
                            top: `${pos.y}%`,
                            left: `${pos.x}%`,
                            cursor: "pointer"
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