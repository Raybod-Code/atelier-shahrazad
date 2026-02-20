'use client';

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX }            from "lucide-react";
import { motion }                       from "framer-motion";

export default function SoundManager() {
  const [isPlaying, setIsPlaying]   = useState(false);
  const audioRef                    = useRef<HTMLAudioElement | null>(null);
  const hasInteracted               = useRef(false);

  useEffect(() => {
    audioRef.current        = new Audio("/sounds/ambient.mp3");
    audioRef.current.loop   = true;
    audioRef.current.volume = 0.2;

    const tryPlay = () => {
      audioRef.current?.play()
        .then(() => {
          setIsPlaying(true);
          hasInteracted.current = true;
        })
        .catch(() => {});
    };

    const handleFirstClick = () => {
      if (!hasInteracted.current && audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
        hasInteracted.current = true;
        window.removeEventListener("click", handleFirstClick);
      }
    };

    tryPlay();
    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
      audioRef.current?.pause();
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      onClick={toggleSound}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // ✅ aria-label + aria-pressed
      aria-label={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      aria-pressed={isPlaying}
      title={isPlaying ? "Mute sound" : "Play sound"}
      className="fixed bottom-8 left-8 z-[100] rounded-full border border-white/5 bg-black/40 p-3 text-paper/60 backdrop-blur-md transition-colors duration-300 hover:border-gold/50 hover:text-gold"
    >
      {isPlaying
        ? <Volume2 size={18} aria-hidden="true" />
        : <VolumeX size={18} aria-hidden="true" />
      }
    </motion.button>
  );
}
