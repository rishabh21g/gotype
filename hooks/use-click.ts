"use client";
import { useEffect, useRef } from 'react';

export default function useGlobalClickSound() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio("/sounds/mouse-click.mp3");
        const handleClick = () => {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.volume = 0.5;
                audioRef.current.play();
            }
        };
        window.addEventListener("pointerdown", handleClick);
        return () => window.removeEventListener("pointerdown", handleClick);
    }, []);
    return null
}