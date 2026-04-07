import { useEffect } from "react";
import "./ShekelsReward.css";

export default function ShekelsReward({ shekels, word, meaning, onContinue, sfxMuted, sfxVolume }) {
  useEffect(() => {
    if (sfxMuted) return;
    const audio = new Audio(`/sounds/reward_0${Math.ceil(Math.random() * 3)}.mp3`);
    audio.volume = sfxVolume ?? 0.7;
    audio.play().catch(() => {
      const playOnTouch = () => {
        audio.play().catch(() => {});
        document.removeEventListener("touchstart", playOnTouch);
      };
      document.addEventListener("touchstart", playOnTouch, { once: true });
    });
  }, [sfxMuted, sfxVolume]);

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

