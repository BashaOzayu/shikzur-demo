import "./TitleScreen.css";

export default function TitleScreen({ onStart }) {
  return (
    <div className="title-screen">
      <div className="title-content">
        <p className="title-eyebrow">DreadKnot Juice Press presents</p>

        <h1 className="title-arabic-main">شِقْزُر زاكن</h1>
        <h2 className="title-english-main">The Shikzur of Zaken</h2>

        <div className="title-divider">
          <span className="divider-line" />
          <span className="divider-mark">✦</span>
          <span className="divider-line" />
        </div>

        <p className="title-intro">
          The library has fallen quiet. Sand covers what was once a great hall of knowledge.
          You have come to restore what remains — one fragment at a time.
        </p>

        <button className="title-btn" onClick={onStart}>
          Begin Restoration
        </button>

        <p className="title-footer">Arabic · Peace · Study · Knowledge</p>
      </div>
    </div>
  );
}
