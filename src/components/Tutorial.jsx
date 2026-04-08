import { useCallback, useEffect, useRef, useState } from "react";
import "./Tutorial.css";

const slides = [
  {
    id: 1,
    type: "narration",
    title: "Arrival at the Library",
    visual:
      "A vast desert at dusk. Purple sky. Silhouettes of travelers approaching ruins on the dunes. Palm trees bent in wind.",
    narration: "Ah, welcome to the library.",
  },
  {
    id: 2,
    type: "narration",
    title: "What is Arabic?",
    visual:
      "An aged inscription carved into alabaster stone at the library entrance. Arabic script visible. English translation fades in beneath it: Ta-Waw-Sin-Nun-Alif.",
    narration:
      "This is Arabic. An ancient Semitic language developed from the Nabataean Aramaic script between the 3rd and 4th centuries AD.",
  },
  {
    id: 3,
    type: "narration",
    title: "The Arabic Alphabet",
    visual:
      "An unfurled scroll displaying all 28 Arabic letters arranged in rows, hand-inked on aged parchment.",
    narration:
      "Arabic has 28 letters, and like most Semitic languages, it is comprised of all consonants — no vowels.",
  },
  {
    id: 4,
    type: "narration",
    title: "The Tusna Library",
    visual:
      "Interior of a ruined library. Broken cedar shelves. Sand drifting through cracked walls. Manuscripts half-buried. A single oil lamp burns in the corner.",
    narration:
      "In this ancient library, destroyed by war and the sands of time, contains over 1400 years of history and secrets.",
  },
  {
    id: 5,
    type: "narration",
    title: "What is Transcription?",
    visual:
      "A scroll lying in fragments on a stone floor. Beside it, a fresh sheet of parchment and a reed pen.",
    narration:
      "This here scroll was found in fragments. Your job here is to restore the scroll by putting it back together and rewriting it on new parchment. You'll earn silver shekels to spend at the market.",
  },
  {
    id: 6,
    type: "narration",
    title: "Salaam — Your First Word",
    visual:
      "The word سَلَام on a parchment fragment, lit by oil lamp light. Below it: the romanization Salaam. Four tiles visible at the bottom showing isolated forms: Sin, Lam, Alif, Meem.",
    narration:
      "The word on this fragment is Salaam. It means peace be to you. It is spelled Seen, Lam, Alif, and Meem.",
  },
  {
    id: 7,
    type: "narration",
    title: "Arabic Placement",
    visual:
      "Side by side: the word Salaam in English, then سَلَام in Arabic highlighted on the fragment. Below, four tiles show isolated letter forms. The Seen tile is highlighted.",
    narration:
      "It looks different, doesn't it? That's because in Arabic, letters change form depending on where they are placed in a word. Look...",
  },
  {
    id: 8,
    type: "narration",
    title: "Isolated, Initial, Medial, and Final",
    visual: "chart",
    extra: [
      { letter: "Seen", forms: ["س", "سـ", "ـسـ", "ـس"] },
      { letter: "Lam", forms: ["ل", "لـ", "ـلـ", "ـل"] },
      { letter: "Alif", forms: ["ا", "ا", "ـا", "ـا"] },
      { letter: "Meem", forms: ["م", "مـ", "ـمـ", "ـم"] },
    ],
    narration: "Arabic letters come in 4 forms: Isolated, Initial, Medial, and Final.",
  },
  {
    id: 9,
    type: "narration",
    title: "The Legend of Tusna",
    visual:
      "The ruined library exterior under a purple sunset sky. Sand dunes surrounding the structure.",
    narration:
      "The library of Tusna was said to be a myth to most of the world. However, our cartographers included it in our maps, we recited Tusna's stories, and honored its scholars.",
  },
  {
    id: 10,
    type: "narration",
    title: "Found in the Sand",
    visual:
      "Wide view of the library complex half-buried in sand. Dunes pressing against the walls. A single torch flickers at the entrance.",
    narration:
      "Now, over hundreds of years later, we found Tusna enveloped in sand. What used to be the Earth's center of knowledge is now in ruins.",
  },
  {
    id: 11,
    type: "narration",
    title: "A Heartbeat Remains",
    visual:
      "Close-up of manuscripts half-buried under rubble and sand. Warm ember light glowing between the stones.",
    narration:
      "Tusna is nothing but bones, but a heartbeat can still be heard. Beneath the rubble are its scrolls; like embers lying dormant until a gust of desert wind breathes life into it again, a small group of scholars will revive this library to its former glory.",
  },
  {
    id: 12,
    type: "narration",
    title: "Your First Word: Kitab",
    visual:
      "The word كِتَاب large on a parchment fragment. Romanization below: kitab. Letter names spelled out right to left: Kaf · Ta · Alif · Ba.",
    narration:
      "Let's rewrite this word together. The word is Kitab. Kaf-Ta-Alif-Ba. You need to put the tiles in order, from right to left, to transcribe the word.",
  },
  {
    id: 13,
    type: "choice",
    title: "Choose the Correct Form of Kaf",
    narration:
      "Kaf in its isolated form looks like this. The Initial, Medial, and Final look like this. Since Kaf is at the beginning of the word Kitab, which tile is the correct form?",
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
    title: "Place Ta",
    narration:
      "Ta is in the middle of the word, between the initial and the final. Anything in between is considered a medial form. Find the letter Ta and drag it into its correct spot.",
    word: "كِتَاب",
    romanization: "kitab",
    fragment: "fragment_1.png",
    slots: [
      { letter: "ك", name: "kaf", locked: true },
      { letter: "ت", name: "ta", locked: false, target: true },
      { letter: "ا", name: "alif", locked: true },
      { letter: "ب", name: "ba", locked: true },
    ],
    bankTile: { id: "ta_tutorial", file: "tile_ta.png", letter: "ت", name: "ta" },
    targetSlot: 1,
  },
  {
    id: 15,
    type: "puzzle",
    title: "Try Alif",
    narration: "Try Alif.",
    word: "كِتَاب",
    romanization: "kitab",
    fragment: "fragment_1.png",
    slots: [
      { letter: "ك", name: "kaf", locked: true },
      { letter: "ت", name: "ta", locked: true },
      { letter: "ا", name: "alif", locked: false, target: true },
      { letter: "ب", name: "ba", locked: true },
    ],
    bankTile: { id: "alif_tutorial", file: "tile_alif.png", letter: "ا", name: "alif" },
    targetSlot: 2,
  },
  {
    id: 16,
    type: "puzzle",
    title: "Place Ba",
    narration:
      "Ba is the last letter of this word. Which form is it in? That's correct, its final form. Find the tile Ba and drag it into the last spot.",
    word: "كِتَاب",
    romanization: "kitab",
    fragment: "fragment_1.png",
    slots: [
      { letter: "ك", name: "kaf", locked: true },
      { letter: "ت", name: "ta", locked: true },
      { letter: "ا", name: "alif", locked: true },
      { letter: "ب", name: "ba", locked: false, target: true },
    ],
    bankTile: { id: "ba_tutorial", file: "tile_ba.png", letter: "ب", name: "ba" },
    targetSlot: 3,
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

export default function Tutorial({ onComplete, sfxMuted, sfxVolume }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [interactionComplete, setInteractionComplete] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shaking, setShaking] = useState(null);
  const [puzzleComplete, setPuzzleComplete] = useState(false);
  const [touchDrag, setTouchDrag] = useState(null);
  const [dragging, setDragging] = useState(null);
  const touchDragRef = useRef(null);
  touchDragRef.current = touchDrag;

  const slide = slides[currentSlide];

  const audioRef = useRef(null);
  const unlockedRef = useRef(false);
  const sfxVolumeRef = useRef(sfxVolume);
  sfxVolumeRef.current = sfxVolume;

  useEffect(() => {
    setInteractionComplete(false);
    setSelectedOption(null);
    setShaking(null);
    setPuzzleComplete(false);
    setDragging(null);
    setTouchDrag(null);
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

  const playSlideAudio = useCallback(
    (slideIndex) => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (sfxMuted) return;
      const n = String(slideIndex + 1).padStart(2, "0");
      const audio = new Audio(`/sounds/tutorial_${n}.mp3`);
      audio.volume = sfxVolumeRef.current ?? 0.7;
      audioRef.current = audio;
      audio.play().catch(() => {
        const playOnTouch = () => {
          audio.play().catch(() => {});
          document.removeEventListener("touchstart", playOnTouch);
        };
        document.addEventListener("touchstart", playOnTouch, { once: true });
      });
    },
    [sfxMuted]
  );

  useEffect(() => {
    playSlideAudio(currentSlide);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [currentSlide, playSlideAudio]);

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
      document.addEventListener("touchstart", playOnTouch, { once: true });
    });
  }

  function handleContinue() {
    const s = slides[currentSlide];
    if ((s.type === "choice" || s.type === "puzzle") && !interactionComplete) return;
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
        const audio = new Audio(`/sounds/mistake_0${Math.ceil(Math.random() * 4)}.mp3`);
        audio.volume = sfxVolume ?? 0.7;
        audio.play().catch(() => {});
      }
    }
  }

  function handlePuzzleDragStart(tileId) {
    setDragging(tileId);
  }

  function handlePuzzleDrop(slotIndex) {
    if (!dragging) return;
    const cur = slides[currentSlide];
    if (cur.type !== "puzzle") return;
    const idx = Number(slotIndex);
    if (idx === cur.targetSlot) {
      setPuzzleComplete(true);
      setInteractionComplete(true);
      setDragging(null);
    } else {
      setShaking(dragging);
      setTimeout(() => setShaking(null), 500);
      setDragging(null);
      if (!sfxMuted) {
        const audio = new Audio(`/sounds/mistake_0${Math.ceil(Math.random() * 4)}.mp3`);
        audio.volume = sfxVolume ?? 0.7;
        audio.play().catch(() => {});
      }
    }
  }

  function handlePuzzleTouchStart(e, tileId) {
    e.preventDefault();
    const touch = e.touches[0];
    setTouchDrag({
      tileId,
      x: touch.clientX,
      y: touch.clientY,
    });
    setDragging(tileId);
  }

  function handlePuzzleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch) return;
    setTouchDrag((d) => (d ? { ...d, x: touch.clientX, y: touch.clientY } : d));
  }

  function handlePuzzleTouchEnd(e) {
    e.preventDefault();
    const d = touchDragRef.current;
    if (!d) return;
    const el = document.elementFromPoint(d.x, d.y);
    const slotEl = el?.closest("[data-tutorial-slot]");
    if (slotEl) {
      handlePuzzleDrop(parseInt(slotEl.dataset.tutorialSlot, 10));
    } else {
      setDragging(null);
    }
    setTouchDrag(null);
  }

  const renderVisual = () => {
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

  const renderPuzzle = () => (
    <div
      className="tutorial-puzzle"
      onTouchMove={handlePuzzleTouchMove}
      onTouchEnd={handlePuzzleTouchEnd}
      style={{ touchAction: "none" }}
    >
      {touchDrag && dragging && (
        <div
          style={{
            position: "fixed",
            left: touchDrag.x - 40,
            top: touchDrag.y - 40,
            pointerEvents: "none",
            zIndex: 1000,
            opacity: 0.85,
          }}
        >
          <img src={`/tiles/${slide.bankTile.file}`} alt="" width={80} draggable={false} />
        </div>
      )}

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
        <p className="tutorial-word-arabic">{slide.word}</p>
      </div>

      <div className="tutorial-slots" dir="rtl">
        {slide.slots.map((slot, i) => (
          <div
            key={i}
            className={`tutorial-slot
            ${slot.locked ? "slot-locked" : ""}
            ${slot.target && !puzzleComplete ? "slot-target" : ""}
            ${slot.target && puzzleComplete ? "slot-filled-complete" : ""}
          `}
            data-tutorial-slot={i}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handlePuzzleDrop(i)}
          >
            {(slot.locked || (slot.target && puzzleComplete)) && (
              <img
                src={`/tiles/tile_${slot.name}.png`}
                alt={slot.letter}
                width={64}
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>

      {!puzzleComplete && (
        <div className="tutorial-bank">
          <div
            className={`tutorial-bank-tile ${shaking === slide.bankTile.id ? "option-shake" : ""}`}
            draggable
            onDragStart={() => handlePuzzleDragStart(slide.bankTile.id)}
            onTouchStart={(e) => handlePuzzleTouchStart(e, slide.bankTile.id)}
          >
            <img
              src={`/tiles/${slide.bankTile.file}`}
              alt={slide.bankTile.letter}
              width={72}
              draggable={false}
            />
            <span className="tile-name-label">{slide.bankTile.name}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="tutorial-screen" style={{ touchAction: "none" }}>
      <div className="tutorial-slide anim-fade-in">
        <p className="tutorial-slide-title">{slide.title}</p>

        <div className="tutorial-visual-area">
          {slide.type === "narration" && renderVisual()}
          {slide.type === "choice" && renderChoice()}
          {slide.type === "puzzle" && renderPuzzle()}
        </div>

        <div className="tutorial-narration-bar">
          <p>{slide.narration}</p>
        </div>

        <div className="tutorial-nav">
          <button
            className="tutorial-btn-secondary"
            onClick={() => {
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
              unlockAudio();
              handleReplay();
            }}
          >
            ↺ Replay
          </button>
          <button
            className="title-btn"
            onClick={() => {
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
