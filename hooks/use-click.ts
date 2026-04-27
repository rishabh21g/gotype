"use client"
import { useEffect } from 'react';

const ClickSound = new Audio('/sounds/mouse-click.mp3');
export default function GlobalClickSound() {
    useEffect(() => {
        const handleClick = () => {
            ClickSound.currentTime = 0
            ClickSound.play()
        }

        window.addEventListener("pointerdown", handleClick)
        return () => window.removeEventListener("pointerdown", handleClick)
    }, [])
    return null
} 