"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  AtSign,
  Hash,
  Code2,
  ChevronDown,
  Flame,
  Feather,
  SlidersHorizontal,
} from 'lucide-react'
import { CODE_LANGUAGES, MODES, QUOTE_OPTIONS, TIME_OPTIONS, WORDS_OPTIONS } from '@/constants/config'
import CustomWordsDialog from './ui/CustomDialog'
import CustomTimeDialog from './ui/CustomDialog'
import Pill from './ui/Pill'
import { useConfig } from '@/context/ConfigContext'


// ─── Main Component ───────────────────────────────────────────────────────────

const TypingTestConfig = () => {
const {
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
        } = useConfig()

  // Active sub-options by mode
  const renderSubOptions = () => {
    switch (activeMode) {
      case 'time':
        return (
          <motion.div
            key="time-opts"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1"
          >
            {TIME_OPTIONS.map((t) => (
              <Pill key={t} active={time === t} layoutId="active-time" onClick={() => setTime(t)}>
                {t}s
              </Pill>
            ))}
            <Pill
              active={!TIME_OPTIONS.includes(time)}
              layoutId="active-time"
              onClick={() => setCustomTimeOpen(true)}
            >
              {!TIME_OPTIONS.includes(time) ? `${time}s` : 'custom'}
            </Pill>
          </motion.div>
        )

      case 'words':
        return (
          <motion.div
            key="words-opts"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1"
          >
            {WORDS_OPTIONS.map((w) => (
              <Pill key={w} active={words === w} layoutId="active-words" onClick={() => setWords(w)}>
                {w}
              </Pill>
            ))}
            <Pill
              active={!WORDS_OPTIONS.includes(words)}
              layoutId="active-words"
              onClick={() => setCustomWordsOpen(true)}
            >
              {!WORDS_OPTIONS.includes(words) ? words : 'custom'}
            </Pill>
          </motion.div>
        )

      case 'quote':
        return (
          <motion.div
            key="quote-opts"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-1"
          >
            {QUOTE_OPTIONS.map((q) => (
              <Pill key={q} active={quote === q} layoutId="active-quote" onClick={() => setQuote(q)}>
                {q}
              </Pill>
            ))}
          </motion.div>
        )

      case 'code':
        return (
          <motion.div
            key="code-opts"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex items-center"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-lg border border-border/50 bg-background text-foreground/80 hover:text-foreground hover:bg-muted/30 transition-colors shadow-sm">
                  <Code2 className="w-3.5 h-3.5 text-primary" />
                  {language}
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-44 rounded-xl border-border/60 bg-background shadow-xl p-1"
              >
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground px-2 py-1">
                  Language
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border/40" />
                {CODE_LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={cn(
                      'text-xs rounded-lg cursor-pointer transition-colors',
                      language === lang
                        ? 'text-primary font-semibold bg-primary/8'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {language === lang && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 inline-block" />
                    )}
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 mx-auto w-fit">
        {/* Main pill container */}
        <div className="flex items-center gap-1 bg-muted/30 border border-border/50 rounded-xl p-1.5 shadow-sm backdrop-blur-sm">

          {/* ── Modifiers ─────────────────────────────────── */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setPunctuation((p) => !p)}
              className={cn(
                'flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-lg transition-colors duration-150',
                punctuation
                  ? 'text-primary bg-background border border-border/50 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50',
              )}
            >
              <AtSign className="w-3.5 h-3.5" /> punctuation
            </button>

            <button
              onClick={() => setNumbers((n) => !n)}
              className={cn(
                'flex items-center gap-1.5 h-8 px-3 text-xs font-semibold rounded-lg transition-colors duration-150',
                numbers
                  ? 'text-primary bg-background border border-border/50 shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50',
              )}
            >
              <Hash className="w-3.5 h-3.5" /> numbers
            </button>
          </div>

          <Separator orientation="vertical" className="h-5 mx-1 bg-border/50" />

          {/* ── Difficulty ─────────────────────────────────── */}
          <div className="flex items-center gap-0.5">
            {([
              { id: 'easy', icon: Feather, label: 'easy' },
              { id: 'hard', icon: Flame,   label: 'hard' },
            ] as const).map(({ id, icon: Icon, label }) => (
              <Pill
                key={id}
                active={toughness === id}
                layoutId="active-toughness"
                onClick={() => setToughness(id)}
                className="flex items-center gap-1.5"
              >
                <Icon className="w-3 h-3" /> {label}
              </Pill>
            ))}
          </div>

          <Separator orientation="vertical" className="h-5 mx-1 bg-border/50" />

          {/* ── Modes ─────────────────────────────────────── */}
          <div className="flex items-center gap-0.5">
            {MODES.map(({ id, label, icon: Icon }) => (
              <Pill
                key={id}
                active={activeMode === id}
                layoutId="active-mode"
                onClick={() => setActiveMode(id)}
                className="flex items-center gap-1.5"
              >
                <Icon className="w-3.5 h-3.5" /> {label}
              </Pill>
            ))}
          </div>

          <Separator orientation="vertical" className="h-5 mx-1 bg-border/50" />

          {/* ── Sub-options (animated swap) ────────────────── */}
          <div className="flex items-center min-w-0">
            <AnimatePresence mode="wait">
              {renderSubOptions()}
            </AnimatePresence>
          </div>

          <Separator orientation="vertical" className="h-5 mx-1 bg-border/50" />

          {/* ── Settings trigger ───────────────────────────── */}
          <button className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Dialogs ─────────────────────────────────────────── */}
      <CustomTimeDialog
        open={customTimeOpen}
        onOpenChange={setCustomTimeOpen}
        onConfirm={(val) => setTime(val)}
      />
      <CustomWordsDialog
        open={customWordsOpen}
        onOpenChange={setCustomWordsOpen}
        onConfirm={(val) => setWords(val)}
      />
    </>
  )
}

export default TypingTestConfig