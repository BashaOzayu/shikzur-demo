import "./LetterChart.css";

const letters = [
  { name: "Alif",    isolated: "ا", initial: "ا",  medial: "ـا",  final: "ـا"  },
  { name: "Ba",      isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب"  },
  { name: "Ta",      isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت"  },
  { name: "Tha",     isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث"  },
  { name: "Jim",     isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج"  },
  { name: "Ha",      isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح"  },
  { name: "Kha",     isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ"  },
  { name: "Dal",     isolated: "د", initial: "د",  medial: "ـد",  final: "ـد"  },
  { name: "Dhal",    isolated: "ذ", initial: "ذ",  medial: "ـذ",  final: "ـذ"  },
  { name: "Ra",      isolated: "ر", initial: "ر",  medial: "ـر",  final: "ـر"  },
  { name: "Zay",     isolated: "ز", initial: "ز",  medial: "ـز",  final: "ـز"  },
  { name: "Seen",    isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس"  },
  { name: "Sheen",   isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش"  },
  { name: "Sad",     isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص"  },
  { name: "Dad",     isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض"  },
  { name: "Ta",      isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط"  },
  { name: "Dha",     isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ"  },
  { name: "Ayn",     isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع"  },
  { name: "Ghayn",   isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ"  },
  { name: "Fa",      isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف"  },
  { name: "Qaf",     isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق"  },
  { name: "Kaf",     isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك"  },
  { name: "Lam",     isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل"  },
  { name: "Meem",    isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم"  },
  { name: "Nun",     isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن"  },
  { name: "Ha",      isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه"  },
  { name: "Waw",     isolated: "و", initial: "و",  medial: "ـو",  final: "ـو"  },
  { name: "Ya",      isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي"  },
];

export default function LetterChart({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`letterchart-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />
      <aside className={`letterchart-panel ${isOpen ? "open" : ""}`}>
        <header className="letterchart-header">
          <h3 className="letterchart-title">Letter Reference</h3>
          <button className="letterchart-close" onClick={onClose}>✕</button>
        </header>
        <div className="letterchart-table">
          <div className="table-head">
            <span className="col-name">Letter Name</span>
            <span className="col-form">Isolated</span>
            <span className="col-form">Initial</span>
            <span className="col-form">Medial</span>
            <span className="col-form">Final</span>
          </div>
          <div className="table-body">
            {letters.map((l, idx) => (
              <div className={`table-row ${idx % 2 ? "odd" : ""}`} key={l.name}>
                <span className="cell-name">{l.name}</span>
                <span className="cell-form" dir="rtl">{l.isolated}</span>
                <span className="cell-form" dir="rtl">{l.initial}</span>
                <span className="cell-form" dir="rtl">{l.medial}</span>
                <span className="cell-form" dir="rtl">{l.final}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}

