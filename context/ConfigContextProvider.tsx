"use client"
import { ReactNode, useState } from "react";
import ConfigContext from "./ConfigContext";

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
    const [activeMode, setActiveMode] = useState('time')
    const [punctuation, setPunctuation] = useState(false)
    const [numbers, setNumbers] = useState(false)
    const [toughness, setToughness] = useState<'easy' | 'hard'>('easy')
    // Time
    const [time, setTime] = useState('60')
    const [customTimeOpen, setCustomTimeOpen] = useState(false)
    // Words
    const [words, setWords] = useState('60')
    const [customWordsOpen, setCustomWordsOpen] = useState(false)
    // Quote
    const [quote, setQuote] = useState<'short' | 'medium' | 'long'>('medium')
    // Code
    const [language, setLanguage] = useState('JavaScript')

    return(
        <ConfigContext.Provider value={{
            activeMode, setActiveMode,
            punctuation, setPunctuation,
            numbers, setNumbers,
            toughness, setToughness,
            time, setTime,
            customTimeOpen, setCustomTimeOpen,
            words, setWords,
            customWordsOpen, setCustomWordsOpen,
            quote, setQuote,
            language, setLanguage,
        }}>
            {children}
        </ConfigContext.Provider>
    )
}