export default function Field({ formation, team, onPositionClick }) {

    if (!formation || !formation.positions) {
        return <p>NO FORMATION</p>;
    }

    return (
        <div
            style={{
                position: "relative",
                width: "300px",
                height: "500px",
                margin: "20px auto",
                background: "green",
                border: "2px solid black"
            }}
        >
            {formation.positions.map((pos, index) => (
                <div
                    key={index}
                    onClick={() => onPositionClick(pos.role, index)}
                    style={{
                        position: "absolute",
                        top: `${pos.y}%`,
                        left: `${pos.x}%`,
                        transform: "translate(-50%, -50%)",
                        width: "20px",
                        height: "20px",
                        background: "red",
                        borderRadius: "50%"
                    }}
                />
            ))}
        </div>
    );
}