import { useMemo, useState } from "react";
import "./Market.css";
import { playCoinSound } from "../hooks/useAudio";

const items = [
  { id: "lantern",  name: "Lantern",        cost: 10, type: "supply", description: "Lights the restored reading hall" },
  { id: "fabric",   name: "Fabric & Rugs",  cost: 15, type: "supply", description: "Restores color to the library floors" },
  { id: "excavator",name: "Excavator Crew", cost: 12, type: "worker", description: "Clears sand from the buried east wing" },
  { id: "gardener", name: "Gardener",       cost: 8,  type: "worker", description: "Replants the dry courtyard garden" },
];

export default function Market({ shekels = 30, onComplete, sfxMuted, sfxVolume }) {
  const [balance, setBalance] = useState(shekels);
  const [purchased, setPurchased] = useState(() => new Set());

  const canAfford = (cost) => balance >= cost;
  const isPurchased = (id) => purchased.has(id);

  function handlePurchase(item) {
    if (isPurchased(item.id) || !canAfford(item.cost)) return;
    setBalance((b) => b - item.cost);
    setPurchased((prev) => new Set(prev).add(item.id));
    playCoinSound(sfxMuted ?? false, sfxVolume ?? 0.8);
  }

  const gridItems = useMemo(() => items, []);

  return (
    <div className="market-wrapper">
      <div className="market-content">
        <h2 className="market-title">Bazaar</h2>
        <div className="market-shekels"><span className="coin">◈</span> {balance}</div>
        <div className="market-narration">Spend it wisely... <span className="muted">(chuckles)</span></div>

        <div className="market-grid">
          {gridItems.map((item) => {
            const bought = isPurchased(item.id);
            const afford = canAfford(item.cost);
            const disabled = bought || !afford;
            return (
              <div key={item.id} className={`market-card ${bought ? "purchased" : ""}`}>
                <div className="market-card-head">
                  <h3 className="market-item-name">{item.name}</h3>
                  <span className="market-item-cost"><span className="coin">◈</span> {item.cost}</span>
                </div>
                <p className="market-item-desc">{item.description}</p>
                <button
                  className={`market-buy ${disabled ? "disabled" : ""}`}
                  onClick={() => handlePurchase(item)}
                  disabled={disabled}
                >
                  {bought ? "Purchased ✦" : "Purchase"}
                </button>
              </div>
            );
          })}
        </div>

        <div className="market-actions">
          <button className="title-btn" onClick={onComplete}>End of Demo →</button>
        </div>
      </div>
    </div>
  );
}

