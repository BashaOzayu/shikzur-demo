import "./DropZone.css";

export default function DropZone({
  slots,
  expectedTiles,
  onDrop,
  onDragStart,
  onTouchStart,
  shaking,
  completed,
}) {
  // Slots displayed right-to-left: reverse order visually
  const displaySlots = [...slots].map((tile, i) => ({ tile, index: i }));

  function handleDragOver(e) {
    e.preventDefault();
  }

  return (
    <div className="drop-zone" dir="rtl">
      {displaySlots.map(({ tile, index }) => (
        <div
          key={index}
          className={`drop-slot ${tile ? "filled" : "empty"} ${completed && tile ? "slot-complete" : ""}`}
          data-slot-index={index}
          onDragOver={handleDragOver}
          onDrop={() => onDrop(index)}
        >
          {tile ? (
            <div
              className={`slot-tile ${shaking === tile.id ? "shaking" : ""}`}
              draggable
              onDragStart={() => onDragStart(tile.id, index)}
              onTouchStart={(e) => onTouchStart(e, tile.id, index)}
            >
              <img
                src={`/tiles/${tile.file}`}
                alt={tile.letter}
                className="tile-img"
                draggable={false}
              />
            </div>
          ) : (
            <span className="slot-placeholder">
              {/* slot number hint for RTL — slot 0 is rightmost */}
              <span className="slot-number">{slots.length - index}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
