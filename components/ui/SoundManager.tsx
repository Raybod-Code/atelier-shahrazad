'use client';
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react"; 

export default function SoundManager() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // 1. ساخت آبجکت صدا
    audioRef.current = new Audio("/sounds/ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2; // صدای ملایم

    // 2. تلاش برای پخش (ممکنه فیل بشه اگه کاربر کلیک نکرده باشه)
    const tryPlay = () => {
        if(audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    hasInteracted.current = true;
                })
                .catch((e) => {
                    console.log("Waiting for user interaction...");
                });
        }
    };

    // 3. اگر اتوپلی بلاک شد، منتظر اولین کلیک کاربر میمونیم
    const handleFirstClick = () => {
        if (!hasInteracted.current && audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
            hasInteracted.current = true;
            // حذف لیسنر بعد از اولین اجرا
            window.removeEventListener('click', handleFirstClick);
        }
    };

    tryPlay();
    window.addEventListener('click', handleFirstClick);

    return () => {
        window.removeEventListener('click', handleFirstClick);
        if(audioRef.current) audioRef.current.pause();
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
    <button
      onClick={toggleSound}
      className="fixed bottom-8 left-8 z-[100] p-3 rounded-full border border-white/5 bg-black/40 backdrop-blur-md text-[#E0E0E0] hover:text-[#C7A56A] hover:border-[#C7A56A] transition-all duration-300"
    >
      {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}