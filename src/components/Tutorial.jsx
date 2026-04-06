import { useState } from "react";
import "./Tutorial.css";

const slides = [
  {
    title: "Arrival at the Library",
    visual:
      "A vast desert at dusk. Purple sky. Silhouettes of travelers approaching ruins on the dunes. Palm trees bent in wind.",
    narration: "Ah, welcome to the library.",
  },
  {
    title: "What is Arabic?",
    visual:
      "An aged inscription carved into alabaster stone at the library entrance. Arabic script visible. English translation fades in beneath it: Ta-Waw-Sin-Nun-Alif.",
    narration:
      "This is Arabic. An ancient Semitic language developed from the Nabataean Aramaic script between the 3rd and 4th centuries AD.",
  },
  {
    title: "The Arabic Alphabet",
    visual:
      "An unfurled scroll displaying all 28 Arabic letters arranged in rows, hand-inked on aged parchment.",
    narration:
      "Arabic has 28 letters, and like most Semitic languages, it is comprised of all consonants — no vowels.",
  },
  {
    title: "The Tusna Library",
    visual:
      "Interior of a ruined library. Broken cedar shelves. Sand drifting through cracked walls. Manuscripts half-buried. A single oil lamp burns in the corner.",
    narration:
      "In this ancient library, destroyed by war and the sands of time, contains over 1400 years of history and secrets.",
  },
  {
    title: "What is Transcription?",
    visual:
      "A scroll lying in fragments on a stone floor. Beside it, a fresh sheet of parchment and a reed pen.",
    narration:
      "This here scroll was found in fragments. Your job here is to restore the scroll by putting it back together and rewriting it on new parchment. You'll earn silver shekels to spend at the market.",
  },
  {
    title: "Salaam — Your First Word",
    visual:
      "The word سَلَام on a parchment fragment, lit by oil lamp light. Below it: the romanization 'Salaam'. Four tiles visible at the bottom showing isolated forms: Sin (س), Lam (ل), Alif (ا), Meem (م).",
    narration:
      "The word on this fragment is Salaam. It means peace be to you. It is spelled Seen, Lam, Alif, and Meem.",
  },
  {
    title: "Arabic Placement",
    visual:
      "Side by side: the word 'Salaam' in English, then سَلَام in Arabic — highlighted on the fragment. Below, four tiles show isolated letter forms. The Seen tile is highlighted.",
    narration:
      "It looks different, doesn't it? (chuckles) That's because in Arabic, letters change form depending on where they are placed in a word. Look...",
  },
  {
    title: "Isolated, Initial, Medial, and Final",
    visual:
      "A reference chart showing 4 rows — Seen, Lam, Alif, Meem — each with 4 columns: Isolated, Initial, Medial, Final. Each cell shows the letter form in that position.",
    extra: [
      { letter: "Seen", forms: ["س", "سـ", "ـسـ", "ـس"] },
      { letter: "Lam", forms: ["ل", "لـ", "ـلـ", "ـل"] },
      { letter: "Alif", forms: ["ا", "ا", "ـا", "ـا"] },
      { letter: "Meem", forms: ["م", "مـ", "ـمـ", "ـم"] },
    ],
    narration:
      "Arabic letters come in 4 forms: Isolated — when the letter is by itself. Initial — the first letter of a word. Medial — any letter in between. Final — the last letter of a word.",
  },
];

export default function Tutorial({ onComplete }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function handleContinue() {
    if (index < slides.length - 1) {
      setIndex((i) => i + 1);
    } else {
      onComplete?.();
    }
  }

  return (
    <div className="tutorial-root">
      <div className="tutorial-slide anim-fade-in">
        <h2 className="tutorial-title">{slide.title}</h2>

        <div className="tutorial-visual">
          {index === 7 ? (
            <div className="forms-chart">
              <div className="forms-head">
                <span>Isolated</span>
                <span>Initial</span>
                <span>Medial</span>
                <span>Final</span>
              </div>
              <div className="forms-body">
                {slide.extra.map((row, i) => (
                  <div className="forms-row" key={i}>
                    {row.forms.map((ch, j) => (
                      <div className="forms-cell" key={j} dir="rtl">
                        <span className="forms-char">{ch}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="tutorial-visual-desc">{slide.visual}</p>
          )}

          <div className="tutorial-narration">
            <p>{slide.narration}</p>
          </div>
        </div>

        <div className="tutorial-actions">
          <button className="title-btn" onClick={handleContinue}>
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

