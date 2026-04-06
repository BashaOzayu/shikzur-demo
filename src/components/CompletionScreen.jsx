import "./CompletionScreen.css";

export default function CompletionScreen({ onRestart }) {
  return (
    <div className="completion-screen">
      <div className="completion-candle">
        <div className="candle-flame-large" />
        <div className="candle-body-large" />
      </div>

      <div className="completion-content">
        <p className="completion-eyebrow">Fragment · Study · Book</p>
        <h2 className="completion-arabic">سَلَام · دَرَسَ · كِتَاب</h2>

        <div className="completion-divider">
          <span className="divider-line" />
          <span className="divider-mark">✦</span>
          <span className="divider-line" />
        </div>

        <p className="completion-message-text">
          Three manuscripts restored. The library breathes again.
        </p>
        <p className="completion-sub-text">
          You have begun the work of reclamation.
        </p>

        <div className="completion-words">
          <div className="cw-item">
            <span className="cw-arabic">سَلَام</span>
            <span className="cw-english">peace</span>
          </div>
          <div className="cw-item">
            <span className="cw-arabic">دَرَسَ</span>
            <span className="cw-english">to study</span>
          </div>
          <div className="cw-item">
            <span className="cw-arabic">كِتَاب</span>
            <span className="cw-english">book</span>
          </div>
        </div>

        <button className="completion-btn" onClick={onRestart}>
          Return to the Library
        </button>
      </div>
    </div>
  );
}
