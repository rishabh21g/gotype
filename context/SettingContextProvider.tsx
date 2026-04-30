"use client"
import { AccentColor, FONT_OPTIONS, FontSize, TypingFont } from "@/constants/settings";
import { ReactNode, useState } from "react";
import { SettingContext } from "./SettingContext";
import { tr } from "framer-motion/client";


function loadGoogleFont(family: string) {
  const id = `gf-${family}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`;
  document.head.appendChild(link);
}

function applyAccentToDom(accent: AccentColor) {
  document.documentElement.setAttribute("data-accent", accent);
}

function applyFontToDom(fontId: TypingFont) {
  const option = FONT_OPTIONS.find((f) => f.id === fontId);
  if (!option) return;
  if (option.googleFamily) loadGoogleFont(option.googleFamily);
  document.documentElement.style.setProperty("--typing-font", option.cssFamily);
}
export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [accent, setAccentState] = useState<AccentColor>("teal");
  const [font, setFontState] = useState<TypingFont>("geist-mono");
  const [showKeyboard, setShowKeyboardState] = useState(true);
  const [soundEnabled, setSoundEnabledState] = useState(true);
  const [clickSoundEnabled, setClickSoundEnabledState] = useState(true);
  const [realtimeWpm, setRealtimeWpmState] = useState(false);
  const [faahMode, setFaahModeState] = useState(false);
  const [ghostMode, setGhostModeState] = useState(false);
  const [shakeMode, setShakeModeState] = useState(true);
  const [shakeActive, setShakeActive] = useState(false);
  const [language, setLanguageState] = useState("english");
  const [showDiacritics, setShowDiacriticsState] = useState(true);
  const [fontSize, setFontSizeState] = useState<FontSize>("md");
  const [syntaxHighlighting, setSyntaxHighlightingState] = useState(true);
  const [autoPair, setAutoPairState] = useState(true);
  const [showLineNumbers, setShowLineNumbersState] = useState(true);
  const [soundPackLoading, setSoundPackLoading] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);


  const setAccent = (c: AccentColor) => {
    setAccentState(c);
    applyAccentToDom(c);
    localStorage.setItem("tc-accent", c);
  };

  const setFont = (f: TypingFont) => {
    setFontState(f);
    applyFontToDom(f);
    localStorage.setItem("tc-font", f);
  };

  const setShowKeyboard = (v: boolean) => {
    setShowKeyboardState(v);
    localStorage.setItem("tc-show-keyboard", String(v));
  };

  const setSoundEnabled = (v: boolean) => {
    setSoundEnabledState(v);
    localStorage.setItem("tc-sound-enabled", String(v));
  };

  const setClickSoundEnabled = (v: boolean) => {
    setClickSoundEnabledState(v);
    localStorage.setItem("tc-click-sound-enabled", String(v));
  };

  const setRealtimeWpm = (v: boolean) => {
    setRealtimeWpmState(v);
    localStorage.setItem("tc-realtime-wpm", String(v));
  };

  const setFaahMode = (v: boolean) => {
    setFaahModeState(v);
    localStorage.setItem("tc-faah-mode", String(v));
  };

  const setGhostMode = (v: boolean) => {
    setGhostModeState(v);
    localStorage.setItem("tc-ghost-mode", String(v));
  };

  const setShakeMode = (v: boolean) => {
    setShakeModeState(v);
    localStorage.setItem("tc-shake-mode", String(v));
  };
  const triggerShake = () => {
    setShakeActive(true);
    setTimeout(() => setShakeActive(false), 500); 
  };

  const setLanguage = (l: string) => {
    setLanguageState(l);
    localStorage.setItem("tc-language", l);
  };

  const setShowDiacritics = (v: boolean) => {
    setShowDiacriticsState(v);
    localStorage.setItem("tc-show-diacritics", String(v));
  };

  const setFontSize = (s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem("tc-font-size", s);
  };

  const setSyntaxHighlighting = (v: boolean) => {
    setSyntaxHighlightingState(v);
    localStorage.setItem("tc-syntax-highlighting", String(v));
  };

  const setAutoPair = (v: boolean) => {
    setAutoPairState(v);
    localStorage.setItem("tc-auto-pair", String(v));
  };

  const setShowLineNumbers = (v: boolean) => {
    setShowLineNumbersState(v);
    localStorage.setItem("tc-show-line-numbers", String(v));
  };

  const fontCssFamily =
    FONT_OPTIONS.find((f) => f.id === font)?.cssFamily ?? "var(--font-mono)";

  return (
    <SettingContext.Provider
      value={{
        accent, setAccent,
        font, setFont, fontCssFamily,
        fontSize, setFontSize,
        showKeyboard, setShowKeyboard,
        soundEnabled, setSoundEnabled,
        clickSoundEnabled, setClickSoundEnabled,
        realtimeWpm, setRealtimeWpm,
        faahMode, setFaahMode,
        ghostMode, setGhostMode,
        shakeMode, setShakeMode,
        shakeActive, setShakeActive,
        language, setLanguage,
        showDiacritics, setShowDiacritics,
        syntaxHighlighting, setSyntaxHighlighting,
        autoPair, setAutoPair,
        showLineNumbers, setShowLineNumbers,
        soundPackLoading, setSoundPackLoading,
        settingsLoaded,
        isPanelOpen, setIsPanelOpen,
        triggerShake,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

