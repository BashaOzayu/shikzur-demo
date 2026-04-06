import "./VolumeToggle.css";

export default function VolumeToggle({ muted, onToggle }) {
  return (
    <button
      className="volume-toggle"
      aria-label={muted ? "Unmute" : "Mute"}
      onClick={onToggle}
      title={muted ? "Unmute" : "Mute"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}

