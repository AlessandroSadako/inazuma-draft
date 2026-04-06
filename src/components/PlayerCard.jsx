export default function PlayerCard({ player, onClick }) {
    if (!player) return null;

    const roleColors = {
        GK: "#f1c40f",
        DF: "#3498db",
        MF: "#2ecc71",
        FW: "#e74c3c",
        ANY: "#9b59b6"
    };

    return (
        <div
            className="player-card"
            onClick={onClick}
            style={{
                background: `linear-gradient(180deg, ${roleColors[player.role]} 0%, #111 100%)`
            }}
        >
            <div className="card-role">{player.role}</div>

            <img src={player.image} alt={player.name} />

            <div className="card-name">
                {player.name}
            </div>
        </div>
    );
}