"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { sampleText } from '@/constants/text';
import { cn } from '@/lib/utils';

// Pre-split the text into an array of words
const sampleWords = sampleText.split(' ');

export default function TypingArea() {
  // typedWords stores what the user actually typed for each word index
  const [typedWords, setTypedWords] = useState<string[]>([]);
  // activeWordIndex is the word the user is currently typing
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  // currentInput is the string being typed for the *current* word
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Prevent standard browser scrolling when hitting space
      if (e.key === ' ') e.preventDefault();

      // Ignore modifier keys
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      if (e.key === 'Backspace') {
        if (currentInput.length > 0) {
          // Remove last character of current word
          setCurrentInput((prev) => prev.slice(0, -1));
        } else if (activeWordIndex > 0) {
          // Go back to the previous word if the current word is empty
          const prevIndex = activeWordIndex - 1;
          setActiveWordIndex(prevIndex);
          setCurrentInput(typedWords[prevIndex] || '');
          
          // Remove the previous word from history so it can be retyped
          setTypedWords((prev) => prev.slice(0, -1));
        }
        return;
      }

      if (e.key === ' ') {
        // If they just hit space and haven't typed anything for this word, ignore it
        if (currentInput.trim().length === 0) return;

        // Move to the next word
        setTypedWords((prev) => {
          const newHistory = [...prev];
          newHistory[activeWordIndex] = currentInput;
          return newHistory;
        });
        setActiveWordIndex((prev) => prev + 1);
        setCurrentInput('');
        return;
      }

      // If it's a standard single character, append it
      if (e.key.length === 1) {
        setCurrentInput((prev) => prev + e.key);
      }
    },
    [activeWordIndex, currentInput, typedWords]
  );

  // Attach and detach event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative w-full max-w-5xl mx-auto p-4 focus:outline-none">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-mono leading-relaxed tracking-wide text-left flex flex-wrap gap-x-3 gap-y-2 select-none"
      >
        {sampleWords.map((word, wIdx) => {
          const isCurrentWord = wIdx === activeWordIndex;
          const typedWord = isCurrentWord ? currentInput : typedWords[wIdx] || '';
          
          // We map over the characters of the actual word, PLUS any extra characters the user typed
          const maxLen = Math.max(word.length, typedWord.length);
          const chars = Array.from({ length: maxLen });

          return (
            <div key={wIdx} className="relative flex">
              {chars.map((_, cIdx) => {
                const sampleChar = word[cIdx];
                const typedChar = typedWord[cIdx];

                const isCorrect = typedChar === sampleChar;
                const isIncorrect = typedChar !== undefined && typedChar !== sampleChar;
                const isExtra = cIdx >= word.length;
                const isUntyped = typedChar === undefined;

                // Determine the active character position for the cursor
                const isCursorPosition = isCurrentWord && cIdx === typedWord.length;

                return (
                  <span key={cIdx} className="relative">
                    {/* Render the Animated Caret */}
                    {isCursorPosition && (
                      <motion.span
                        layoutId="caret"
                        className="absolute left-0 top-1 bottom-1 w-0.5 bg-primary rounded-full"
                        transition={{ ease: "easeOut", duration: 0.15 }}
                      />
                    )}

                    {/* Render the Character */}
                    <span
                      className={cn(
                        "transition-colors duration-150",
                        isCorrect && "text-primary",
                        isIncorrect && "text-destructive",
                        isExtra && "text-destructive opacity-75", // Extra typed characters
                        isUntyped && "text-muted-foreground opacity-50"
                      )}
                    >
                      {/* If the user typed an extra character, show what they typed, otherwise show original */}
                      {isExtra ? typedChar : sampleChar}
                    </span>
                  </span>
                );
              })}

              {/* Cursor at the very end of the word if we've typed past its length */}
              {isCurrentWord && typedWord.length >= word.length && (
                <span className="relative">
                  <motion.span
                    layoutId="caret"
                    className="absolute left-0 top-1 bottom-1 w-0.5 bg-primary rounded-full"
                    transition={{ ease: "easeOut", duration: 0.15 }}
                  />
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}