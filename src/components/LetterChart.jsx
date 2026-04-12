import "./LetterChart.css";

const letters = [
  { name: "Alif",  isolated: "ا", initial: "ا",  medial: "ـا",  final: "ـا"  },
  { name: "Ba",    isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب"  },
  { name: "Ta",    isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت"  },
  { name: "Tha",   isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث"  },
  { name: "Jim",   isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج"  },
  { name: "Ha",    isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح"  },
  { name: "Kha",   isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ"  },
  { name: "Dal",   isolated: "د", initial: "د",  medial: "ـد",  final: "ـد"  },
  { name: "Dhal",  isolated: "ذ", initial: "ذ",  medial: "ـذ",  final: "ـذ"  },
  { name: "Ra",    isolated: "ر", initial: "ر",  medial: "ـر",  final: "ـر"  },
  { name: "Zay",   isolated: "ز", initial: "ز",  medial: "ـز",  final: "ـز"  },
  { name: "Seen",  isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس"  },
  { name: "Sheen", isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش"  },
  { name: "Sad",   isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص"  },
  { name: "Dad",   isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض"  },
  { name: "Tta",   isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط"  },
  { name: "Dha",   isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ"  },
  { name: "Ayn",   isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع"  },
  { name: "Ghayn", isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ"  },
  { name: "Fa",    isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف"  },
  { name: "Qaf",   isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق"  },
  { name: "Kaf",   isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك"  },
  { name: "Lam",   isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل"  },
  { name: "Meem",  isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم"  },
  { name: "Nun",   isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن"  },
  { name: "Hha",   isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه"  },
  { name: "Waw",   isolated: "و", initial: "و",  medial: "ـو",  final: "ـو"  },
  { name: "Ya",    isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي"  },
];

export default function LetterChart({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay — clicking closes the chart */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: 199,
          cursor: "pointer",
        }}
      />

      {/* Panel */}
      <div className="letter-chart-panel">
        {/* Header */}
        <div className="letter-chart-header">
          <span className="letter-chart-title">Letter Reference</span>
          <button
            className="letter-chart-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        {/* Column headers */}
        <div className="letter-chart-col-headers">
          <span className="chart-name-col">Letter</span>
          <span>Isolated</span>
          <span>Initial</span>
          <span>Medial</span>
          <span>Final</span>
        </div>

        {/* Scrollable rows */}
        <div className="letter-chart-body">
          {letters.map((l) => (
            <div key={l.name} className="letter-chart-row">
              <span className="chart-letter-name">{l.name}</span>
              <span className="chart-form">{l.isolated}</span>
              <span className="chart-form">{l.initial}</span>
              <span className="chart-form">{l.medial}</span>
              <span className="chart-form">{l.final}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
