export default function Field({ formation, team, onPositionClick, selectedIndex }) {
    return (
        <div className="field">
            {/* Linee campo */}
            <div className="field-line mediana"></div>
            <div className="field-line cerchio"></div>
            <div className="field-line area-rigore top"></div>
            <div className="field-line area-porta top"></div>
            <div className="field-line area-rigore bottom"></div>
            <div className="field-line area-porta bottom"></div>

            {formation.positions.map((pos, i) => {
                const player = team[i];
                const isActive = selectedIndex === i;

                return (
                    <div
                        key={i}
                        className={`player-slot ${isActive ? 'active-slot' : ''} ${!player ? 'empty-slot' : ''}`}
                        style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                        onClick={() => {
                            if (player) return;
                            onPositionClick(pos.role, i);
                        }}
                    >
                        {player ? (
                            <img
                                src={player.image}
                                alt={player.name}
                                className={`player-img ${player.justPicked ? 'player-enter' : ''}`}
                            />
                        ) : (
                            <div className="placeholder"></div>
                        )}

                        <span className="player-role-label-on-field">
                            {pos.role}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}