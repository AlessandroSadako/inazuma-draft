export default function Field({ formation, team, onPositionClick, selectedIndex }) {
    return (
        <div className="field">
            {/* Linee del campo */}
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
                        className={`player-slot ${isActive ? 'active-slot' : ''}`}
                        style={{ top: `${pos.y}%`, left: `${pos.x}%` }}
                        onClick={() => onPositionClick(pos.role, i)}
                    >
                        {player ? (
                            <img src={player.image} className="player-img" alt={player.name} />
                        ) : (
                            <div className="placeholder"></div>
                        )}
                        <span className="player-role-label-on-field">{pos.role}</span>
                    </div>
                );
            })}
        </div>
    );
}