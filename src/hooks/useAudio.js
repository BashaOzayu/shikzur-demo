import { useEffect, useRef } from "react";

export function useBackgroundMusic(src, muted) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.35;
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
}

export function useTileSound(src, muted) {
  const audioRef = useRef(null);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.volume = 0.6;
  }, [src]);

  return () => {
    if (audioRef.current && !mutedRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };
}

