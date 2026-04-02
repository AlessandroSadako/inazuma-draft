export default function Bench({ bench }) {
    return (
        <div className="mt-4">
            <h4>Panchina</h4>

            <div className="d-flex justify-content-center gap-2">
                {bench.map((p, i) => (
                    <img key={i} src={p.image} width="50" />
                ))}
            </div>
        </div>
    );
}