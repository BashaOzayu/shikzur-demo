import "./VolumeToggle.css";

export default function VolumeToggle({
  musicMuted,
  sfxMuted,
  onMusicToggle,
  onSfxToggle,
  onMusicVolume,
  onSfxVolume,
}) {
  return (
    <div className="volume-panel">
      <div className="volume-row">
        <button className="volume-btn" onClick={onMusicToggle}>
          {musicMuted ? "🔇" : "🎵"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          defaultValue={0.35}
          className="volume-slider"
          onChange={(e) => onMusicVolume(parseFloat(e.target.value))}
        />
      </div>
      <div className="volume-row">
        <button className="volume-btn" onClick={onSfxToggle}>
          {sfxMuted ? "🔇" : "🔊"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          defaultValue={0.7}
          className="volume-slider"
          onChange={(e) => onSfxVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}
