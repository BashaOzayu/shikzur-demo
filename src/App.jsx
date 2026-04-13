import { useState } from "react";
import { fragments } from "./data/fragments";
import GameBoard from "./components/GameBoard";
import Tutorial from "./components/Tutorial";
import TitleScreen from "./components/TitleScreen";
import CompletionScreen from "./components/CompletionScreen";
import ShekelsReward from "./components/ShekelsReward";
import Market from "./components/Market";
import LetterChart from "./components/LetterChart";
import { useBackgroundMusic, playCoinSound } from "./hooks/useAudio";
import VolumeToggle from "./components/VolumeToggle";
import ShekelsHUD from "./components/ShekelsHUD";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("title"); // tutorial | title | game | reward | market | complete
  const [levelIndex, setLevelIndex] = useState(0);
  const [shekels, setShekels] = useState(0);
  const [gold, setGold] = useState(0);
  const [musicMuted, setMusicMuted] = useState(false);
  const [sfxMuted, setSfxMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.35);
  const [sfxVolume, setSfxVolume] = useState(0.7);
  const [chartOpen, setChartOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const currentFragment = fragments[levelIndex];
  useBackgroundMusic("/sounds/oudmusic.mp3", musicMuted || videoPlaying, musicVolume);

  function handleLevelComplete() {
    setShekels((s) => s + 10);
    playCoinSound(sfxMuted, sfxVolume);
    setTimeout(() => setScreen("reward"), 600);
  }

  function handleRewardContinue() {
    if (levelIndex < fragments.length - 1) {
      setLevelIndex((i) => i + 1);
      setScreen("game");
    } else {
      setScreen("market");
    }
  }

  return (
    <div className="app-root">
      <VolumeToggle
        musicMuted={musicMuted}
        sfxMuted={sfxMuted}
        onMusicToggle={() => setMusicMuted((m) => !m)}
        onSfxToggle={() => setSfxMuted((s) => !s)}
        onMusicVolume={setMusicVolume}
        onSfxVolume={setSfxVolume}
      />
      {screen !== "tutorial" && screen !== "title" && (
        <ShekelsHUD silver={shekels} gold={gold} />
      )}
      {screen === "tutorial" && (
        <Tutorial
          onComplete={() => setScreen("game")}
          sfxMuted={sfxMuted}
          sfxVolume={sfxVolume}
          onOpenChart={() => setChartOpen(true)}
          onCloseChart={() => setChartOpen(false)}
          chartOpen={chartOpen}
          onVideoStart={() => setVideoPlaying(true)}
          onVideoEnd={() => setVideoPlaying(false)}
        />
      )}
      {screen === "title" && (
        <TitleScreen onStart={() => setScreen("tutorial")} />
      )}
      {screen === "game" && (
        <GameBoard
          fragment={currentFragment}
          levelIndex={levelIndex}
          totalLevels={fragments.length}
          onComplete={handleLevelComplete}
          sfxMuted={sfxMuted}
          sfxVolume={sfxVolume}
          chartOpen={chartOpen}
          onOpenChart={() => setChartOpen(true)}
          onCloseChart={() => setChartOpen(false)}
        />
      )}
      {screen === "reward" && (
        <ShekelsReward
          shekels={shekels}
          word={currentFragment.word}
          meaning={currentFragment.meaning}
          onContinue={handleRewardContinue}
          sfxMuted={sfxMuted}
          sfxVolume={sfxVolume}
        />
      )}
      {screen === "market" && (
        <Market
          shekels={shekels}
          onComplete={() => setScreen("complete")}
          sfxMuted={sfxMuted}
          sfxVolume={sfxVolume}
        />
      )}
      {screen === "complete" && (
        <CompletionScreen onRestart={() => { setLevelIndex(0); setScreen("title"); }} />
      )}
      <LetterChart isOpen={chartOpen} onClose={() => setChartOpen(false)} />
    </div>
  );
}
