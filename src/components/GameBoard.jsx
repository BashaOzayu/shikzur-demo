import { useState, useEffect, useCallback, useRef } from "react";
import TileBank from "./TileBank";
import DropZone from "./DropZone";
import "./GameBoard.css";
import { useTileSound } from "../hooks/useAudio";

function playAudio(src, volume = 0.7) {
  const audio = new Audio(src);
  audio.volume = volume;
  const attempt = () => {
    audio.play().catch(() => {
      document.addEventListener(
        "touchstart",
        () => {
          audio.play().catch(() => {});
        },
        { once: true, passive: true }
      );
    });
  };
  attempt();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GameBoard({
  fragment,
  levelIndex,
  totalLevels,
  onComplete,
  sfxMuted,
  sfxVolume,
  chartOpen = false,
  onOpenChart = () => {},
  onCloseChart = () => {},
}) {
  const [slots, setSlots] = useState([]);         // array of tile|null per slot
  const [bankTiles, setBankTiles] = useState([]); // tiles still in bank
  const [shaking, setShaking] = useState(null);   // tile id currently shaking
  const [completed, setCompleted] = useState(false);
  const [dragging, setDragging] = useState(null); // { tileId, source: 'bank'|slotIndex }
  const playTileSound = useTileSound("/sounds/tilesound.mp3", sfxMuted, sfxVolume);

  // Reset state when fragment changes
  useEffect(() => {
    const allTiles = shuffle([...fragment.tiles, ...fragment.decoys]);
    setBankTiles(allTiles);
    setSlots(new Array(fragment.tiles.length).fill(null));
    setCompleted(false);
    setDragging(null);
    setShaking(null);
  }, [fragment]);

  const checkComplete = useCallback((newSlots) => {
    const correct = fragment.tiles.every((t, i) => newSlots[i]?.id === t.id);
    if (correct) {
      setCompleted(true);
      onComplete();
    }
  }, [fragment, onComplete]);

  // --- Drag handlers ---
  function handleDragStart(tileId, source) {
    setDragging({ tileId, source });
  }

  function handleDropOnSlot(slotIndex) {
    if (!dragging) return;
    const { tileId, source } = dragging;

    // Find the tile object
    const tileObj =
      source === "bank"
        ? bankTiles.find((t) => t.id === tileId)
        : slots[source];

    if (!tileObj) return;

    const expectedTile = fragment.tiles[slotIndex];
    const isCorrect = tileObj.id === expectedTile.id ||
      // For tiles reused across levels (alif, sin) match by letter position
      (tileObj.letter === expectedTile.letter && tileObj.file === expectedTile.file);

    if (!isCorrect) {
      // Shake and return
      setShaking(tileId);
      setTimeout(() => setShaking(null), 500);

      if (!sfxMuted) {
        playAudio(
          `/sounds/mistake_0${Math.ceil(Math.random() * 4)}.mp3`,
          sfxVolume ?? 0.7
        );
      }

      setDragging(null);
      return;
    }

    // Build new slots
    const newSlots = [...slots];

    // If tile came from another slot, clear that slot
    if (typeof source === "number") {
      newSlots[source] = null;
    }

    // If slot already had a tile, send it back to bank
    const displaced = newSlots[slotIndex];
    let newBank = source === "bank"
      ? bankTiles.filter((t) => t.id !== tileId)
      : [...bankTiles];

    if (displaced) newBank = [...newBank, displaced];
    if (typeof source === "number") {
      // already removed from slot above, don't double-add to bank
    }

    newSlots[slotIndex] = tileObj;
    setSlots(newSlots);
    playTileSound();
    setBankTiles(newBank);
    setDragging(null);
    checkComplete(newSlots);
  }

  function handleDropOnBank() {
    if (!dragging) return;
    const { tileId, source } = dragging;
    if (source === "bank") { setDragging(null); return; }

    // Return slot tile to bank
    const tileObj = slots[source];
    if (!tileObj) { setDragging(null); return; }

    const newSlots = [...slots];
    newSlots[source] = null;
    setBankTiles((b) => [...b, tileObj]);
    setSlots(newSlots);
    setDragging(null);
  }

  // Touch drag state
  const [touchDrag, setTouchDrag] = useState(null);
  const boardRef = useRef(null);
  const touchDragRef = useRef(null);
  const dropApiRef = useRef({
    handleDropOnSlot: () => {},
    handleDropOnBank: () => {},
    setDragging: () => {},
  });

  touchDragRef.current = touchDrag;
  dropApiRef.current = {
    handleDropOnSlot,
    handleDropOnBank,
    setDragging,
  };

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const onMove = (e) => {
      handleTouchMove(e);
    };
    const onEnd = (e) => {
      handleTouchEnd(e);
    };
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: false });
    el.addEventListener("touchcancel", onEnd, { passive: false });
    return () => {
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  function handleTouchStart(e, tileId, source) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = touch.clientX - rect.left - rect.width / 2;
    const offsetY = touch.clientY - rect.top - rect.height / 2;
    setTouchDrag({
      tileId,
      source,
      x: touch.clientX,
      y: touch.clientY,
      offsetX,
      offsetY,
    });
    setDragging({ tileId, source });
  }

  function handleTouchMove(e) {
    e.preventDefault();
    if (!touchDragRef.current) return;
    const touch = e.touches[0];
    setTouchDrag((d) => ({
      ...d,
      x: touch.clientX,
      y: touch.clientY,
    }));
  }

  function handleTouchEnd(e) {
    e.preventDefault();
    const d = touchDragRef.current;
    if (!d) return;
    const el = document.elementFromPoint(d.x, d.y);
    const slotEl = el?.closest("[data-slot-index]");
    const bankEl = el?.closest("[data-bank]");

    if (slotEl) {
      dropApiRef.current.handleDropOnSlot(parseInt(slotEl.dataset.slotIndex, 10));
    } else if (bankEl) {
      dropApiRef.current.handleDropOnBank();
    } else {
      dropApiRef.current.setDragging(null);
    }
    setTouchDrag(null);
  }

  const levelLabel = `Fragment ${levelIndex + 1} of ${totalLevels}`;

  return (
    <div
      ref={boardRef}
      className="game-board"
      onMouseUp={() => setDragging(null)}
      onTouchStart={(e) => e.stopPropagation()}
      style={{ touchAction: "none" }}
    >
      <button
        type="button"
        aria-label={chartOpen ? "Close letter chart" : "Open letter chart"}
        onClick={chartOpen ? onCloseChart : onOpenChart}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          background: chartOpen ? "rgba(201,151,58,0.15)" : "transparent",
          border: "1px solid rgba(168,124,69,0.4)",
          color: "var(--bronze-light)",
          width: "auto",
          padding: "6px 12px",
          height: 32,
          cursor: "pointer",
          fontSize: "0.78rem",
          borderRadius: 2,
          letterSpacing: "0.1em",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        {chartOpen ? "✕ Chart" : "ⓘ Chart"}
      </button>
      {/* Touch drag ghost */}
      {touchDrag && dragging && (
        <div
          className="touch-ghost"
          style={{
            position: "fixed",
            left: touchDrag.x - 40,
            top: touchDrag.y - 40,
            pointerEvents: "none",
            zIndex: 1000,
            opacity: 0.9,
            transform: "scale(1.15)",
            transition: "none",
          }}
        >
          <img
            src={`/tiles/${
              bankTiles.find((t) => t.id === dragging?.tileId)?.file ||
              slots.find((s) => s?.id === dragging?.tileId)?.file ||
              ""
            }`}
            alt=""
            width={80}
            draggable={false}
            style={{ display: "block" }}
          />
        </div>
      )}

      {/* Level indicator */}
      <div className="level-indicator">
        <span className="level-dots">
          {Array.from({ length: totalLevels }).map((_, i) => (
            <span
              key={i}
              className={`level-dot ${i === levelIndex ? "active" : i < levelIndex ? "done" : ""}`}
            />
          ))}
        </span>
        <span className="level-label">{levelLabel}</span>
      </div>

      {/* Parchment fragment display */}
      <div
        className={`fragment-card ${completed ? "fragment-complete" : ""}`}
        style={{
          backgroundImage: `url(/tiles/${fragment.fragment})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="fragment-ornament top" />

        <div className="fragment-target">
          <p className="fragment-arabic">{fragment.word}</p>
        </div>

        <div className="fragment-ornament bottom" />
      </div>

      <div className="fragment-meta">
        <p className="fragment-romanized">{fragment.romanization}</p>
        <p className="fragment-hint">{fragment.hint}</p>
      </div>

      {/* Instruction */}
      <p className="rtl-instruction">← Place letters right to left</p>

      {/* Drop zone — RTL reconstruction slots */}
      <DropZone
        slots={slots}
        expectedTiles={fragment.tiles}
        onDrop={handleDropOnSlot}
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        shaking={shaking}
        completed={completed}
      />

      {/* Tile bank */}
      <TileBank
        tiles={bankTiles}
        onDragStart={handleDragStart}
        onDrop={handleDropOnBank}
        onTouchStart={handleTouchStart}
        shaking={shaking}
      />

      {/* Completion message */}
      {completed && (
        <div className="completion-message">
          <span className="completion-word">{fragment.meaning}</span>
          <span className="completion-sub">Fragment restored</span>
        </div>
      )}
    </div>
  );
}
