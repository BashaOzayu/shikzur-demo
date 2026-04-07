import { useEffect, useRef } from "react";

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
  const audioRef = useRef(null);
  const mutedRef = useRef(muted);
  const volumeRef = useRef(volume ?? 0.7);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);
  useEffect(() => {
    volumeRef.current = volume ?? 0.7;
  }, [volume]);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volumeRef.current;
  }, [src]);

  return () => {
    if (audioRef.current && !mutedRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = volumeRef.current;
      audioRef.current.play().catch(() => {});
    }
  };
}
