import "./ShekelsHUD.css";

export default function ShekelsHUD({ silver = 0, gold = 0 }) {
  return (
    <div className="shekels-hud anim-fade-in">
      <div className="shekels-row">
        <img src="/tiles/silver_bag.png" alt="Silver bag" className="shekels-bag" />
        <span className="shekels-num">{silver}</span>
      </div>
      <div className="shekels-row">
        <img src="/tiles/gold_bag.png" alt="Gold bag" className="shekels-bag" />
        <span className="shekels-num">{gold}</span>
      </div>
    </div>
  );
}

