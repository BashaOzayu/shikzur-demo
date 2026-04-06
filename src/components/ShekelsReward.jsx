import "./ShekelsReward.css";

export default function ShekelsReward({ shekels, word, meaning, onContinue }) {
  return (
    <div className="reward-root anim-fade-in">
      <div className="reward-ornament" />
      <h2 className="reward-earned">✦ 10 Silver Shekels Earned ✦</h2>
      <p className="reward-arabic" dir="rtl">{word}</p>
      <p className="reward-meaning">{meaning}</p>
      <p className="reward-total"><span className="coin">◈</span> {shekels}</p>
      <button className="title-btn" onClick={onContinue}>Continue →</button>
    </div>
  );
}

