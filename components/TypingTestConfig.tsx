"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { AtSign, Hash, Wrench } from 'lucide-react'
import { Separator } from './ui/separator'
import { CONFIG } from '@/constants/config'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const TypingTestConfig = () => {
    const [activeMode, setActiveMode] = useState('time');
    const [activeDuration, setActiveDuration] = useState('60');
    
    // Toggles
    const [punctuation, setPunctuation] = useState<boolean>(false);
    const [numbers, setNumbers] = useState<boolean>(false);
    const [toughness, setToughness] = useState<"easy" | "hard">("easy");
    
    // Other settings (preserved from your state)
    const [time, setTime] = useState<"15"| "30"| "60"| "120">("60");
    const [words, setWords] = useState<number>(100);
    const [quote, setQuote] = useState<"short"| "medium"| "long">("medium");

    return (
        <div className="flex flex-wrap items-center justify-center bg-muted/40 rounded-xl p-1.5 gap-2 text-sm font-medium my-12 mx-auto w-fit border border-border/50 shadow-sm">
            
            {/* Modifiers */}
            <div className="flex items-center gap-1">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(prev) => setPunctuation(!prev)}
                    className={cn("h-8 gap-2 transition-colors", punctuation ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                >
                    <AtSign className="w-4 h-4" /> punctuation
                </Button>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(prev) => setNumbers(!prev)}
                    className={cn("h-8 gap-2 transition-colors", numbers ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                >
                    <Hash className="w-4 h-4" /> numbers
                </Button>
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-border" />

            {/* Difficulty */}
            <div className="flex items-center gap-1 relative">
                {['easy', 'hard'].map((level) => (
                    <Button 
                        key={level}
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setToughness(level as "easy" | "hard")}
                        className={cn("h-8 relative z-10 transition-colors", toughness === level ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                    >
                        {toughness === level && (
                            <motion.div
                                layoutId="active-toughness"
                                className="absolute inset-0 bg-background rounded-md shadow-sm border border-border/50 -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {level}
                    </Button>
                ))}
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-border" />

            {/* Modes */}
            <div className="flex items-center gap-1 relative">
                {CONFIG.map((mode) => (
                    <Button
                        key={mode.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveMode(mode.id)}
                        className={cn("h-8 gap-2 relative z-10 transition-colors", activeMode === mode.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                    >
                        {activeMode === mode.id && (
                            <motion.div
                                layoutId="active-mode"
                                className="absolute inset-0 bg-background rounded-md shadow-sm border border-border/50 -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <mode.icon className="w-4 h-4" /> {mode.label}
                    </Button>
                ))}
            </div>

            <Separator orientation="vertical" className="h-6 mx-1 bg-border" />

            {/* Duration / Amounts */}
            <div className="flex items-center gap-1 relative">
                {['15', '30', '60', '120'].map((duration) => (
                    <Button
                        key={duration}
                        variant="ghost"
                        size="sm"
                        onClick={() => setActiveDuration(duration)}
                        className={cn("h-8 relative z-10 transition-colors", activeDuration === duration ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                    >
                        {activeDuration === duration && (
                            <motion.div
                                layoutId="active-duration"
                                className="absolute inset-0 bg-primary/20 rounded-md shadow-sm border border-border/50 -z-10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {duration}
                    </Button>
                ))}
                
                <Separator orientation="vertical" className="h-4 mx-1 bg-border" />
                
                <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground">
                    <Wrench className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}

export default TypingTestConfig