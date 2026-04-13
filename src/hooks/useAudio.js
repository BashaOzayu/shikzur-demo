import { useEffect, useRef } from "react";

let audioUnlocked = false;

export function unlockAudioContext() {
  if (audioUnlocked) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  ctx.resume();
  const silent = ctx.createBuffer(1, 1, 22050);
  const source = ctx.createBufferSource();
  source.buffer = silent;
  source.connect(ctx.destination);
  source.start(0);
  audioUnlocked = true;
}

export function useBackgroundMusic(src, muted, volume) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume ?? 0.35;
    audioRef.current = audio;
    const play = () => audio.play().catch(() => {});
    document.addEventListener("click", play, { once: true });
    return () => {
      audio.pause();
      document.removeEventListener("click", play);
    };
  }, [src]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume ?? 0.35;
  }, [volume]);
}

export function useTileSound(src, muted, volume) {
  const poolRef = useRef([]);
  const mutedRef = useRef(muted);
  const volumeRef = useRef(volume ?? 0.7);
  const poolIndexRef = useRef(0);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);
  useEffect(() => {
    volumeRef.current = volume ?? 0.7;
  }, [volume]);

  useEffect(() => {
    poolRef.current = [new Audio(src), new Audio(src), new Audio(src)];
    poolRef.current.forEach((a) => {
      a.volume = volumeRef.current;
    });
  }, [src]);

  return () => {
    if (mutedRef.current) return;
    const pool = poolRef.current;
    if (!pool.length) return;
    setTimeout(() => {
      const audio = pool[poolIndexRef.current % pool.length];
      poolIndexRef.current++;
      audio.volume = volumeRef.current;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }, 400);
  };
}

export function playCoinSound(muted, volume) {
  if (muted) return;
  const audio = new Audio("/sounds/coin.wav");
  audio.volume = volume ?? 0.8;
  audio.play().catch(() => {
    document.addEventListener("touchstart", () => {
      audio.play().catch(() => {});
    }, { once: true, passive: true });
  });
}
