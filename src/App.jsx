import { useState } from "react";
import { fragments } from "./data/fragments";
import GameBoard from "./components/GameBoard";
import Tutorial from "./components/Tutorial";
import TitleScreen from "./components/TitleScreen";
import CompletionScreen from "./components/CompletionScreen";
import ShekelsReward from "./components/ShekelsReward";
import Market from "./components/Market";
import { useBackgroundMusic } from "./hooks/useAudio";
import VolumeToggle from "./components/VolumeToggle";
import ShekelsHUD from "./components/ShekelsHUD";
import "./App.css";

export default function App() {
  const [screen, setScreen] = useState("title"); // tutorial | title | game | reward | market | complete
  const [levelIndex, setLevelIndex] = useState(0);
  const [shekels, setShekels] = useState(0);
  const [gold, setGold] = useState(0);
  const [muted, setMuted] = useState(false);

  const currentFragment = fragments[levelIndex];
  useBackgroundMusic("/sounds/oudmusic.mp3", muted);

  function handleLevelComplete() {
    setShekels((s) => s + 10);
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
      <VolumeToggle muted={muted} onToggle={() => setMuted((m) => !m)} />
      {screen !== "tutorial" && screen !== "title" && (
        <ShekelsHUD silver={shekels} gold={gold} />
      )}
      {screen === "tutorial" && (
        <Tutorial onComplete={() => setScreen("game")} />
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
          muted={muted}
        />
      )}
      {screen === "reward" && (
        <ShekelsReward
          shekels={shekels}
          word={currentFragment.word}
          meaning={currentFragment.meaning}
          onContinue={handleRewardContinue}
        />
      )}
      {screen === "market" && (
        <Market
          shekels={shekels}
          onComplete={() => setScreen("complete")}
        />
      )}
      {screen === "complete" && (
        <CompletionScreen onRestart={() => { setLevelIndex(0); setScreen("title"); }} />
      )}
    </div>
  );
}
