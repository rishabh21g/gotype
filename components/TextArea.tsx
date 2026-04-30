"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MousePointerClick, RotateCcw, CheckCircle2, Timer } from "lucide-react";
import { useConfig } from "@/context/ConfigContext"; 
import { useSettings } from "@/context/SettingContext";

import { buildWordList } from "@/lib/builder";
import { TestStatus } from "@/types/text";
import { StatsBar } from "./StatsBar";
import { FinishedOverlay } from "./FinishedOverlay";
export default function TextArea() {
  const {
    activeMode,
    punctuation,
    numbers,
    time: configTime,    // e.g. "15" | "30" | "60" | custom string
    words: configWords,  // e.g. "30" | "60" | "90" | custom string
    quote,               // "short" | "medium" | "long"
    language,            // e.g. "JavaScript"
    toughness,           // "easy" | "hard"
  } = useConfig();

  const { realtimeWpm, shakeMode, ghostMode, fontSize, fontCssFamily } = useSettings();

  // ── Derive word list whenever config changes ─────────────────────────────
  const wordList = useMemo(
    () => buildWordList(activeMode, configWords, quote, language, punctuation, numbers),
    [activeMode, configWords, quote, language, punctuation, numbers],
  );

  // ── Core typing state ────────────────────────────────────────────────────
  const [focus,           setFocus]           = useState(false);
  const [typedWords,      setTypedWords]       = useState<string[]>([]);
  const [activeWordIndex, setActiveWordIndex]  = useState(0);
  const [currentInput,    setCurrentInput]     = useState("");
  const [status,          setStatus]           = useState<TestStatus>("idle");
  const [shake,           setShake]            = useState(false);

  // ── Timer state ──────────────────────────────────────────────────────────
  const timeLimitSec      = parseInt(configTime) || 60;
  const [timeLeft,        setTimeLeft]         = useState(timeLimitSec);
  const timerRef          = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef      = useRef<number | null>(null);

  // ── Stats ────────────────────────────────────────────────────────────────
  const [wpm,      setWpm]      = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  // ── Helpers ──────────────────────────────────────────────────────────────
  const totalCharsTyped = useRef(0);
  const totalErrors     = useRef(0);

  const calcStats = useCallback(
    (finishedWords: string[], elapsedSec: number) => {
      const correctWords = finishedWords.filter(
        (w, i) => w === wordList[i],
      ).length;
      const minutes  = Math.max(elapsedSec / 60, 0.01);
      const computed = Math.round(correctWords / minutes);
      const acc      = totalCharsTyped.current === 0
        ? 100
        : Math.round(
            ((totalCharsTyped.current - totalErrors.current) /
              totalCharsTyped.current) *
              100,
          );
      setWpm(computed);
      setAccuracy(Math.max(0, acc));
    },
    [wordList],
  );

  const finishTest = useCallback(
    (finishedWords: string[]) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const elapsed = startTimeRef.current
        ? (Date.now() - startTimeRef.current) / 1000
        : timeLimitSec;
      calcStats(finishedWords, elapsed);
      setStatus("finished");
    },
    [calcStats, timeLimitSec],
  );

  /** Full reset */
  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTypedWords([]);
    setActiveWordIndex(0);
    setCurrentInput("");
    setStatus("idle");
    setTimeLeft(timeLimitSec);
    setWpm(0);
    setAccuracy(100);
    startTimeRef.current  = null;
    totalCharsTyped.current = 0;
    totalErrors.current     = 0;
  }, [timeLimitSec]);

  // Reset when config changes
  useEffect(() => { resetTest(); }, [activeMode, configTime, configWords, quote, language, punctuation, numbers]);

  // ── Timer tick for "time" mode ───────────────────────────────────────────
  useEffect(() => {
    if (status !== "running" || activeMode !== "time") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // finish with current typed words — use functional update pattern
          setTypedWords((tw) => {
            finishTest(tw);
            return tw;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [status, activeMode, finishTest]);

  // ── Live WPM update (every 2s while running) ─────────────────────────────
  useEffect(() => {
    if (status !== "running" || !realtimeWpm) return;
    const id = setInterval(() => {
      const elapsed = startTimeRef.current
        ? (Date.now() - startTimeRef.current) / 1000
        : 1;
      calcStats(typedWords, elapsed);
    }, 2000);
    return () => clearInterval(id);
  }, [status, realtimeWpm, typedWords, calcStats]);

  // ── Keyboard handler ─────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (status === "finished") {
        if (e.key === "Tab") { e.preventDefault(); resetTest(); }
        return;
      }
      if (!focus) setFocus(true);
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === " ") e.preventDefault();

      // Start timer on first keypress
      if (status === "idle" && e.key.length === 1) {
        setStatus("running");
        startTimeRef.current = Date.now();
      }

      if (e.key === "Backspace") {
        if (currentInput.length > 0) {
          setCurrentInput((p) => p.slice(0, -1));
        } else if (activeWordIndex > 0) {
          const prev = activeWordIndex - 1;
          setActiveWordIndex(prev);
          setCurrentInput(typedWords[prev] || "");
          setTypedWords((p) => p.slice(0, -1));
        }
        return;
      }

      if (e.key === " ") {
        if (!currentInput.trim()) return;

        const newTyped = [...typedWords];
        newTyped[activeWordIndex] = currentInput;

        // Track errors
        const expected = wordList[activeWordIndex] ?? "";
        for (let i = 0; i < Math.max(currentInput.length, expected.length); i++) {
          totalCharsTyped.current++;
          if (currentInput[i] !== expected[i]) totalErrors.current++;
        }

        const nextIdx = activeWordIndex + 1;

        // "words" mode: finish when all words typed
        if (activeMode === "words" && nextIdx >= wordList.length) {
          setTypedWords(newTyped);
          finishTest(newTyped);
          return;
        }

        // "quote" / "code" mode: finish at last word
        if ((activeMode === "quote" || activeMode === "code") && nextIdx >= wordList.length) {
          setTypedWords(newTyped);
          finishTest(newTyped);
          return;
        }

        setTypedWords(newTyped);
        setActiveWordIndex(nextIdx);
        setCurrentInput("");
        return;
      }

      if (e.key.length === 1) {
        // Shake on wrong char in hard mode
        const expected = wordList[activeWordIndex]?.[currentInput.length];
        if (shakeMode && toughness === "hard" && expected && e.key !== expected) {
          setShake(true);
          setTimeout(() => setShake(false), 400);
        }
        setCurrentInput((p) => p + e.key);
      }
    },
    [
      status, focus, currentInput, activeWordIndex, typedWords,
      wordList, activeMode, toughness, shakeMode, finishTest, resetTest,
    ],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // ── Font size map ────────────────────────────────────────────────────────
  const fontSizeClass: Record<string, string> = {
    sm:  "text-xl",
    md:  "text-2xl",
    lg:  "text-3xl",
    xl:  "text-4xl",
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-5xl max-h-80  mx-auto select-none">
      {/* Stats bar */}
      <StatsBar
        wpm={wpm}
        accuracy={accuracy}
        timeLeft={timeLeft}
        mode={activeMode}
        realtimeWpm={realtimeWpm}
      />

      {/* Main typing area */}
      <motion.div
        animate={shake ? { x: [-6, 6, -5, 5, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className={cn(
          "relative min-h-36 rounded-2xl p-5 cursor-default transition-all duration-300"
        )}
        onClick={() => { if (!focus) setFocus(true); }}
      >
        {/* Unfocused overlay */}
        <AnimatePresence>
          {!focus && status !== "finished" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl backdrop-blur-[2px] bg-background/30"
            >
              <div className="flex items-center gap-2 text-primary text-sm font-medium tracking-wide">
                <MousePointerClick className="w-4 h-4" />
                <span>Click or press any key to start</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Finished overlay */}
        <AnimatePresence>
          {status === "finished" && (
            <FinishedOverlay wpm={wpm} accuracy={accuracy} onRestart={resetTest} />
          )}
        </AnimatePresence>

        {/* Word display */}
        <div
          className={cn(
            "flex flex-wrap gap-x-3 gap-y-2 leading-relaxed font-mono transition-all duration-300 max-h-80 overflow-y-auto",
            fontSizeClass[fontSize] ?? "text-2xl",
            (status === "finished" || !focus) && "blur-[2px] opacity-30 pointer-events-none",
          )}
          style={fontCssFamily ? { fontFamily: fontCssFamily } : undefined}
        >
          {wordList.map((word, wIdx) => {
            const isCurrentWord = wIdx === activeWordIndex;
            const typedWord     = isCurrentWord ? currentInput : (typedWords[wIdx] ?? "");
            const isCompleted   = wIdx < activeWordIndex;
            const maxLen        = Math.max(word.length, typedWord.length);

            return (
              <div
                key={wIdx}
                className={cn(
                  "relative flex transition-opacity duration-200",
                  // Ghost mode: fade out completed words
                  ghostMode && isCompleted && "opacity-20",
                  // Future words dim
                  !isCurrentWord && !isCompleted && "opacity-40",
                )}
              >
                {Array.from({ length: maxLen }).map((_, cIdx) => {
                  const sampleChar      = word[cIdx];
                  const typedChar       = typedWord[cIdx];
                  const isCorrect       = typedChar !== undefined && typedChar === sampleChar;
                  const isWrong         = typedChar !== undefined && typedChar !== sampleChar;
                  const isExtra         = cIdx >= word.length;
                  const isCursorHere    = isCurrentWord && cIdx === typedWord.length;

                  return (
                    <span key={cIdx} className="relative">
                      {/* Animated caret */}
                      {focus && isCursorHere && status !== "finished" && (
                        <motion.span
                          layoutId="caret"
                          className="absolute left-0 top-[10%] bottom-[10%] w-[2px] rounded-full bg-primary"
                          transition={{ ease: "easeOut", duration: 0.12 }}
                        />
                      )}

                      <span
                        className={cn(
                          "transition-colors duration-100",
                          isCorrect  && "text-foreground",
                          isWrong    && "text-destructive",
                          isExtra    && "text-destructive/70",
                          !isCorrect && !isWrong && !isExtra && "text-muted-foreground/40",
                        )}
                      >
                        {isExtra ? typedChar : sampleChar}
                      </span>
                    </span>
                  );
                })}

                {/* Caret at word end (over-typed) */}
                {focus && isCurrentWord && typedWord.length >= word.length && status !== "finished" && (
                  <span className="relative w-0">
                    <motion.span
                      layoutId="caret"
                      className="absolute left-0 top-[10%] bottom-[10%] w-[2px] rounded-full bg-primary"
                      transition={{ ease: "easeOut", duration: 0.12 }}
                    />
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Restart hint */}
        {status === "running" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-2 right-4 text-[10px] text-muted-foreground/30 font-mono tracking-widest"
          >
            tab to restart
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}