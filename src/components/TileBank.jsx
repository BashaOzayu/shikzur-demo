import "./TileBank.css";

export default function TileBank({ tiles, onDragStart, onDrop, onTouchStart, shaking }) {
  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div
      className="tile-bank"
      data-bank="true"
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <p className="tile-bank-label">Letter Tiles</p>
      <div className="tile-bank-grid">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={`bank-tile ${shaking === tile.id ? "shaking" : ""}`}
            draggable
            onDragStart={() => onDragStart(tile.id, "bank")}
            onTouchStart={(e) => onTouchStart(e, tile.id, "bank")}
            title={tile.letter}
          >
            <img
              src={`/tiles/${tile.file}`}
              alt={tile.letter}
              className="bank-tile-img"
              draggable={false}
            />
            <span className="tile-letter-hint">{tile.name}</span>
          </div>
        ))}
        {tiles.length === 0 && (
          <p className="tile-bank-empty">All tiles placed</p>
        )}
      </div>
    </div>
  );
}
