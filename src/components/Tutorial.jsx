import { useState, useEffect, useRef } from "react";
import "./Tutorial.css";
import { unlockAudioContext } from "../hooks/useAudio";
import EmberEffect from "./EmberEffect";

function playAudio(src, volume = 0.7) {
  const audio = new Audio(src);
  audio.volume = volume;
  const attempt = () => {
    audio.play().catch(() => {
      const playOnTouch = () => {
        audio.play().catch(() => {});
        document.removeEventListener("touchstart", playOnTouch);
      };
      document.addEventListener("touchstart", playOnTouch, {
        once: true,
        passive: true,
      });
    });
  };
  attempt();
}

const slides = [
  {
    id: 13,
    type: "choice",
    title: "Choose the Correct Form of Kaf",
    narration:
      "Kaf in its isolated form looks like this. The Initial, Medial, and Final forms look like this. Since Kaf is at the beginning of the word Kitab, which tile shows the correct form?",
    question: "Since Kaf begins the word كِتَاب, which form is correct?",
    options: [
      { label: "Isolated", arabic: "ك", correct: false },
      { label: "Initial", arabic: "كـ", correct: true },
      { label: "Medial", arabic: "ـكـ", correct: false },
      { label: "Final", arabic: "ـك", correct: false },
    ],
  },
  {
    id: 14,
    type: "puzzle",
    title: "Transcribe Kitab",
    narration:
      "Now, let's transcribe the word Kitab together. Drag each letter into its correct position, from right to left.",
    word: "كِتَاب",
    romanization: "kitab",
    fragment: "fragment_1.png",
    steps: [
      {
        targetSlot: 1,
        targetTileId: "ta_tutorial",
        lockedSlots: [0],
        bankTiles: [
          { id: "ta_tutorial", file: "tile_ta.png", letter: "ت", name: "ta" },
          { id: "alif_tutorial", file: "tile_alif.png", letter: "ا", name: "alif" },
          { id: "ba_tutorial", file: "tile_ba.png", letter: "ب", name: "ba" },
          { id: "decoy_sin", file: "tile_sin.png", letter: "س", name: "seen" },
        ],
      },
      {
        targetSlot: 2,
        targetTileId: "alif_tutorial",
        lockedSlots: [0, 1],
        bankTiles: [
          { id: "alif_tutorial", file: "tile_alif.png", letter: "ا", name: "alif" },
          { id: "ba_tutorial", file: "tile_ba.png", letter: "ب", name: "ba" },
          { id: "decoy_mim", file: "tile_mim.png", letter: "م", name: "meem" },
        ],
      },
      {
        targetSlot: 3,
        targetTileId: "ba_tutorial",
        lockedSlots: [0, 1, 2],
        bankTiles: [
          { id: "ba_tutorial", file: "tile_ba.png", letter: "ب", name: "ba" },
          { id: "decoy_dal", file: "tile_dal.png", letter: "د", name: "dal" },
          { id: "decoy_ra", file: "tile_ra.png", letter: "ر", name: "ra" },
        ],
      },
    ],
    allSlots: [
      { letter: "ك", name: "kaf" },
      { letter: "ت", name: "ta" },
      { letter: "ا", name: "alif" },
      { letter: "ب", name: "ba" },
    ],
  },
  {
    id: 16.5,
    type: "reveal",
    title: "Kitab",
    narration: "Good. So, Kaf, Ta, Alif, and Ba come together to create the word, Kitab.",
    word: "كِتَاب",
    fragment: "fragment_1.png",
    letters: [
      { arabic: "ك", name: "Kaf" },
      { arabic: "ت", name: "Ta" },
      { arabic: "ا", name: "Alif" },
      { arabic: "ب", name: "Ba" },
    ],
  },
  {
    id: 17,
    type: "narration",
    title: "Well Done",
    visual:
      "The completed word كِتَاب glowing softly on the parchment fragment. Warm bronze light surrounds it.",
    narration:
      "Well done, you have transcribed your first word. Your scholarly burden has just begun.",
  },
];

const TRANSCRIBE_KITAB_SLIDE_INDEX = slides.findIndex((s) => s.title === "Transcribe Kitab");

export default function Tutorial({ onComplete, sfxMuted, sfxVolume, onOpenChart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [interactionComplete, setInteractionComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shaking, setShaking] = useState(null);
  const [puzzleStep, setPuzzleStep] = useState(0);
  const [tilesGreyed, setTilesGreyed] = useState(false);
  const [placedTileIds, setPlacedTileIds] = useState([]);
  const [touchDrag, setTouchDrag] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [tutorialBgLoaded, setTutorialBgLoaded] = useState(false);
  const [litLetters, setLitLetters] = useState([]);
  const [chartHighlighted, setChartHighlighted] = useState(false);
  const chartOpenedRef = useRef(false);
  const tilesGreyedRef = useRef(false);
  const touchDragRef = useRef(null);
  touchDragRef.current = touchDrag;
  tilesGreyedRef.current = tilesGreyed;

  useEffect(() => {
    let cancelled = false;
    setTutorialBgLoaded(false);
    const bgImage = `/tiles/tutorial_bg_${String(currentSlide + 1).padStart(2, "0")}.png`;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setTutorialBgLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setTutorialBgLoaded(false);
    };
    img.src = bgImage;
    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [currentSlide]);

  const slide = slides[currentSlide];

  const audioRef = useRef(null);
  const unlockedRef = useRef(false);
  const sfxVolumeRef = useRef(sfxVolume);
  sfxVolumeRef.current = sfxVolume;

  useEffect(() => {
    setInteractionComplete(false);
    setSelectedOption(null);
    setShaking(null);
    setPuzzleStep(0);
    setTilesGreyed(false);
    tilesGreyedRef.current = false;
    setPlacedTileIds([]);
    setDragging(null);
    setTouchDrag(null);
    setLitLetters([]);
    setChartHighlighted(false);
    chartOpenedRef.current = false;
  }, [currentSlide]);

  useEffect(() => {
    const slide = slides[currentSlide];
    if (slide.title === "Transcribe Kitab" && !chartOpenedRef.current) {
      chartOpenedRef.current = true;
      setChartHighlighted(true);
      const timer = setTimeout(() => {
        onOpenChart();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  useEffect(() => {
    const slide = slides[currentSlide];
    if (slide.type !== "reveal") return;

    setLitLetters([]);
    const timers = [];

    // Light up in reading order: 0 (Kaf) → 1 (Ta) → 2 (Alif) → 3 (Ba)
    [0, 1, 2, 3].forEach((letterIndex, i) => {
      const timer = setTimeout(() => {
        setLitLetters((prev) => [...prev, letterIndex]);
      }, 1000 + i * 1500);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, [currentSlide]);

  function unlockAudio() {
    if (unlockedRef.current) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    ctx.resume().then(() => {
      unlockedRef.current = true;
    });
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (sfxMuted) return;

    const n = String(currentSlide + 1).padStart(2, "0");
    const audio = new Audio(`/sounds/tutorial_${n}.mp3`);
    audio.volume = sfxVolumeRef.current ?? 0.7;
    audioRef.current = audio;
    audio.play().catch(() => {
      const playOnTouch = () => {
        audio.play().catch(() => {});
        document.removeEventListener("touchstart", playOnTouch);
      };
      document.addEventListener("touchstart", playOnTouch, {
        once: true,
        passive: true,
      });
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSlide, sfxMuted]);

  useEffect(() => {
    if (!audioRef.current || sfxMuted) return;
    audioRef.current.volume = sfxVolume ?? 0.7;
  }, [sfxVolume, sfxMuted]);

  function handleReplay() {
    if (sfxMuted || !audioRef.current) return;
    audioRef.current.volume = sfxVolume ?? 0.7;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {
      const playOnTouch = () => {
        audioRef.current?.play().catch(() => {});
        document.removeEventListener("touchstart", playOnTouch);
      };
      document.addEventListener("touchstart", playOnTouch, {
        once: true,
        passive: true,
      });
    });
  }

  function handleContinue() {
    const s = slides[currentSlide];

    if (s.type === "puzzle") {
      if (!interactionComplete) return;

      const isLastStep = puzzleStep >= s.steps.length - 1;

      if (!isLastStep) {
        setPuzzleStep((p) => p + 1);
        setTilesGreyed(false);
        tilesGreyedRef.current = false;
        setInteractionComplete(false);
        setDragging(null);
        setShaking(null);
      } else {
        setPuzzleStep(0);
        setTilesGreyed(false);
        tilesGreyedRef.current = false;
        setInteractionComplete(false);
        setPlacedTileIds([]);
        setCurrentSlide((i) => i + 1);
      }
      return;
    }

    if (s.type === "choice" && !interactionComplete) return;

    if (currentSlide < slides.length - 1) {
      setCurrentSlide((i) => i + 1);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      onComplete?.();
    }
  }

  function handleOptionSelect(option) {
    if (interactionComplete) return;
    if (option.correct) {
      setSelectedOption({ ...option, result: "correct" });
      setInteractionComplete(true);
    } else {
      setSelectedOption({ ...option, result: "wrong" });
      setShaking(option.label);
      setTimeout(() => setShaking(null), 500);
      if (!sfxMuted) {
        playAudio(`/sounds/mistake_0${Math.ceil(Math.random() * 4)}.mp3`, sfxVolume ?? 0.7);
      }
    }
  }

  function handlePuzzleDragStart(tileId) {
    setDragging(tileId);
  }

  function handlePuzzleDrop(slotIndex) {
    if (!dragging) return;
    const slide = slides[currentSlide];
    if (slide.type !== "puzzle") return;
    if (tilesGreyedRef.current) return;

    const step = slide.steps[puzzleStep];
    const isCorrectTile = dragging === step.targetTileId;
    const isCorrectSlot = slotIndex === step.targetSlot;

    if (isCorrectTile && isCorrectSlot) {
      setPlacedTileIds((prev) => [...prev, step.targetTileId]);
      setTilesGreyed(true);
      tilesGreyedRef.current = true;
      setDragging(null);

      playAudio(`/sounds/reward_0${Math.ceil(Math.random() * 3)}.mp3`, sfxVolume ?? 0.7);

      setInteractionComplete(true);
    } else {
      setShaking(dragging);
      setTimeout(() => setShaking(null), 500);
      setDragging(null);

      playAudio(`/sounds/mistake_0${Math.ceil(Math.random() * 4)}.mp3`, sfxVolume ?? 0.7);
    }
  }

  function handlePuzzleTouchStart(e, tileId) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = touch.clientX - (rect.left + rect.width / 2);
    const offsetY = touch.clientY - (rect.top + rect.height / 2);
    setTouchDrag({
      tileId,
      x: touch.clientX,
      y: touch.clientY,
      offsetX,
      offsetY,
    });
    setDragging(tileId);
  }

  function handlePuzzleTouchMove(e) {
    e.preventDefault();
    if (!touchDrag) return;
    const touch = e.touches[0];
    setTouchDrag((d) => ({
      ...d,
      x: touch.clientX,
      y: touch.clientY,
    }));
  }

  function handlePuzzleTouchEnd(e) {
    e.preventDefault();
    const d = touchDragRef.current;
    if (!d) return;
    const el = document.elementFromPoint(d.x, d.y);
    const slotEl = el?.closest("[data-tutorial-slot]");
    if (slotEl && !tilesGreyedRef.current) {
      handlePuzzleDrop(parseInt(slotEl.dataset.tutorialSlot, 10));
    } else {
      setDragging(null);
    }
    setTouchDrag(null);
  }

  const renderVisual = () => {
    if (slide.title === "A Heartbeat Remains") {
      return (
        <div style={{ position: "relative", width: "100%" }}>
          <EmberEffect />
          <div className="tutorial-visual-placeholder">
            <p className="tutorial-visual-desc">{slide.visual}</p>
          </div>
        </div>
      );
    }

    if (slide.visual === "chart") {
      return (
        <div className="tutorial-chart">
          <div className="chart-header">
            <span className="chart-header-spacer" aria-hidden="true" />
            {["Isolated", "Initial", "Medial", "Final"].map((h) => (
              <span key={h} className="chart-col-label">
                {h}
              </span>
            ))}
          </div>
          {slide.extra.map((row) => (
            <div key={row.letter} className="chart-row">
              <span className="chart-letter-name">{row.letter}</span>
              {row.forms.map((f, i) => (
                <span key={i} className="chart-form">
                  {f}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }
    const bgImage = `/tiles/tutorial_bg_${String(currentSlide + 1).padStart(2, "0")}.png`;

    if (tutorialBgLoaded) {
      return (
        <div
          className="tutorial-visual-placeholder"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(10,8,25,0.45)",
              borderRadius: "2px",
            }}
          />
        </div>
      );
    }

    return (
      <div className="tutorial-visual-placeholder">
        <p className="tutorial-visual-desc">{slide.visual}</p>
      </div>
    );
  };

  const renderChoice = () => (
    <div className="tutorial-choice">
      <p className="tutorial-question">{slide.question}</p>
      <div className="tutorial-options">
        {slide.options.map((option) => (
          <div
            key={option.label}
            className={`tutorial-option
            ${selectedOption?.label === option.label && selectedOption?.result === "correct" ? "option-correct" : ""}
            ${shaking === option.label ? "option-shake" : ""}
            ${selectedOption?.label === option.label && selectedOption?.result === "wrong" ? "option-wrong" : ""}
          `}
            onClick={() => handleOptionSelect(option)}
          >
            <span className="option-arabic">{option.arabic}</span>
            <span className="option-label">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPuzzle = () => {
    const puzzleSlide = slides[currentSlide];
    const step = puzzleSlide.steps[puzzleStep];

    return (
      <div
        className="tutorial-puzzle"
        onTouchMove={handlePuzzleTouchMove}
        onTouchEnd={handlePuzzleTouchEnd}
        style={{ touchAction: "none" }}
      >
        {touchDrag && dragging && (() => {
          const tile = step.bankTiles?.find((t) => t.id === dragging);
          if (!tile) return null;
          return (
            <div
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
                src={`/tiles/${tile.file}`}
                alt=""
                width={80}
                draggable={false}
                style={{ display: "block" }}
              />
            </div>
          );
        })()}

        <div
          className="tutorial-fragment"
          style={{
            backgroundImage: `url(/tiles/${puzzleSlide.fragment})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "140px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="tutorial-word-arabic" style={{ color: "#1a0a00" }}>
            {puzzleSlide.word}
          </p>
        </div>

        <p
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-dim)",
          }}
        >
          Step {puzzleStep + 1} of {puzzleSlide.steps.length}
        </p>

        <div className="tutorial-slots" dir="rtl">
          {puzzleSlide.allSlots.map((slot, i) => {
            const isLocked = step.lockedSlots.includes(i);
            const isTarget = i === step.targetSlot;
            const isPlaced = placedTileIds.includes(
              puzzleSlide.steps.find((st) => st.targetSlot === i)?.targetTileId
            );

            return (
              <div
                key={i}
                className={`tutorial-slot
                ${isLocked || isPlaced ? "slot-locked" : ""}
                ${isTarget && !tilesGreyed ? "slot-target" : ""}
                ${isTarget && tilesGreyed ? "slot-filled-complete" : ""}
              `}
                data-tutorial-slot={i}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => !tilesGreyed && handlePuzzleDrop(i)}
              >
                {(isLocked || isPlaced) && (
                  <img
                    src={`/tiles/tile_${slot.name}.png`}
                    alt={slot.letter}
                    width={64}
                    draggable={false}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="tutorial-bank">
          {step.bankTiles
            .filter((tile) => !placedTileIds.includes(tile.id))
            .map((tile) => (
              <div
                key={tile.id}
                className={`tutorial-bank-tile
                ${shaking === tile.id ? "option-shake" : ""}
                ${tilesGreyed ? "tile-greyed" : ""}
              `}
                draggable={!tilesGreyed}
                onDragStart={() => !tilesGreyed && handlePuzzleDragStart(tile.id)}
                onTouchStart={(e) => !tilesGreyed && handlePuzzleTouchStart(e, tile.id)}
              >
                <img
                  src={`/tiles/${tile.file}`}
                  alt={tile.letter}
                  width={64}
                  draggable={false}
                />
                <span className="tile-name-label">{tile.name}</span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderReveal = () => {
    const slide = slides[currentSlide];

    // Letters in RTL visual order: index 0=Kaf on right, 3=Ba on left
    // Display order left-to-right on screen: Ba(3), Alif(2), Ta(1), Kaf(0)
    // Light up order: Kaf(0) first, Ba(3) last

    return (
      <div className="tutorial-reveal">
        <div
          className="tutorial-fragment"
          style={{
            backgroundImage: `url(/tiles/${slide.fragment})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            minHeight: "160px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="tutorial-word-arabic" style={{ color: "#1a0a00" }}>
            {slide.word}
          </p>
        </div>

        {/* dir="rtl" makes Kaf appear on the right, Ba on the left */}
        <div className="reveal-letters" dir="rtl">
          {slide.letters.map((letter, letterIndex) => {
            const isLit = litLetters.includes(letterIndex);
            return (
              <div
                key={letterIndex}
                className={`reveal-letter ${isLit ? "reveal-letter-lit" : ""}`}
              >
                <span className="reveal-arabic">{letter.arabic}</span>
                <span className="reveal-name">{letter.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="tutorial-screen" style={{ touchAction: "none" }}>
      {(chartHighlighted ||
        (TRANSCRIBE_KITAB_SLIDE_INDEX !== -1 &&
          currentSlide >= TRANSCRIBE_KITAB_SLIDE_INDEX)) && (
        <div
          className="chart-highlight-pulse"
          style={{
            position: "fixed",
            top: 12,
            right: 12,
            zIndex: 300,
            pointerEvents: "none",
          }}
        >
          <span className="chart-pulse-ring" />
        </div>
      )}
      <div className="tutorial-slide anim-fade-in">
        <p className="tutorial-slide-title">{slide.title}</p>

        <div className="tutorial-visual-area">
          {slide.type === "narration" && renderVisual()}
          {slide.type === "choice" && renderChoice()}
          {slide.type === "puzzle" && renderPuzzle()}
          {slide.type === "reveal" && renderReveal()}
        </div>

        <div className="tutorial-narration-bar">
          <p>{slide.narration}</p>
        </div>

        <div className="tutorial-nav">
          <button
            className="tutorial-btn-secondary"
            onClick={() => {
              unlockAudioContext();
              unlockAudio();
              setCurrentSlide((s) => s - 1);
            }}
            disabled={currentSlide === 0}
          >
            ← Back
          </button>
          <button
            className="tutorial-btn-secondary"
            onClick={() => {
              unlockAudioContext();
              unlockAudio();
              handleReplay();
            }}
          >
            ↺ Replay
          </button>
          <button
            className="title-btn"
            onClick={() => {
              unlockAudioContext();
              unlockAudio();
              handleContinue();
            }}
            disabled={(slide.type === "choice" || slide.type === "puzzle") && !interactionComplete}
            style={{
              opacity:
                (slide.type === "choice" || slide.type === "puzzle") && !interactionComplete
                  ? 0.35
                  : 1,
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}
