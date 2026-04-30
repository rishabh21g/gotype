"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ChevronDown, Monitor, Moon, Sun, X, Volume2, Keyboard, LayoutDashboard, Code2, Zap, Type } from "lucide-react"
import { useSettings } from "@/context/SettingContext"
import { FONT_SIZES } from "@/constants/settings"
import { useTheme } from "@/context/ThemeContex"

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ElementType
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="group">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary">
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-foreground/70">{title}</p>
          {description && (
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="pl-8.5 space-y-1">{children}</div>
    </div>
  )
}

// ─── Setting Row ──────────────────────────────────────────────────────────────
function SettingRow({
  label,
  description,
  checked,
  onCheckedChange,
}: {
  label: string
  description?: string
  checked: boolean
  onCheckedChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/40 transition-colors duration-150 group/row">
      <div className="space-y-0.5 flex-1 pr-4">
        <p className="text-sm font-medium text-foreground/90 group-hover/row:text-foreground transition-colors">
          {label}
        </p>
        {description && (
          <p className="text-[11px] text-muted-foreground leading-snug">{description}</p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-primary"
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function SettingsPanel() {
  const {
    font,
    fontSize, setFontSize,
    showKeyboard, setShowKeyboard,
    soundEnabled, setSoundEnabled,
    clickSoundEnabled, setClickSoundEnabled,
    realtimeWpm, setRealtimeWpm,
    ghostMode, setGhostMode,
    shakeMode, setShakeMode,
    syntaxHighlighting, setSyntaxHighlighting,
    autoPair, setAutoPair,
    showLineNumbers, setShowLineNumbers,
    isPanelOpen, setIsPanelOpen,
  } = useSettings()

  const {theme , settheme} = useTheme()
  return (
    <AnimatePresence>
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            onClick={() => setIsPanelOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="relative z-10 w-105 max-h-[86vh] flex flex-col rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/20 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-muted/20">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold tracking-widest uppercase text-foreground/80">
                  Settings
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                onClick={() => setIsPanelOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 custom-scrollbar">

              {/* ── Theme ── */}
              <Section icon={Monitor} title="Theme" description="Appearance preference">
                <div className="flex items-center gap-1.5 p-1 rounded-xl border border-border/60 bg-muted/30 w-fit">
                  {[
                    { icon: Monitor, label: "System", value: "system" },
                    { icon: Sun, label: "Light", value: "light" },
                    { icon: Moon, label: "Dark", value: "dark" },
                  ].map(({ icon: Icon, label, value }) => (
                    <button
                      key={label}
                      onClick={() => settheme(value as "light" | "dark" | "system")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                        theme === value
                          ? "bg-background text-foreground shadow-sm border border-border/40"
                          : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </Section>

              <div className="h-px bg-border/40" />

              {/* ── Sound ── */}
              <Section icon={Volume2} title="Sound" description="Audio feedback when typing">
                <SettingRow
                  label="Keyboard Sound"
                  description="Play sounds as you type"
                  checked={soundEnabled}
                  onCheckedChange={setSoundEnabled}
                />
                <SettingRow
                  label="Click Sound"
                  description="Play a click on each keypress"
                  checked={clickSoundEnabled}
                  onCheckedChange={setClickSoundEnabled}
                />
              </Section>

              <div className="h-px bg-border/40" />

              {/* ── Interface ── */}
              <Section icon={LayoutDashboard} title="Interface" description="Layout and display options">
                <SettingRow
                  label="Show Keyboard"
                  description="Display on-screen keyboard"
                  checked={showKeyboard}
                  onCheckedChange={setShowKeyboard}
                />
                <SettingRow
                  label="Realtime Stats"
                  description="Show live WPM and accuracy"
                  checked={realtimeWpm}
                  onCheckedChange={setRealtimeWpm}
                />
              </Section>

              <div className="h-px bg-border/40" />

              {/* ── Code ── */}
              <Section icon={Code2} title="Code" description="Editor features for snippets">
                <SettingRow
                  label="Syntax Highlighting"
                  checked={syntaxHighlighting}
                  onCheckedChange={setSyntaxHighlighting}
                />
                <SettingRow
                  label="Auto Pair"
                  checked={autoPair}
                  onCheckedChange={setAutoPair}
                />
                <SettingRow
                  label="Line Numbers"
                  checked={showLineNumbers}
                  onCheckedChange={setShowLineNumbers}
                />
              </Section>

              <div className="h-px bg-border/40" />

              {/* ── Modes ── */}
              <Section icon={Zap} title="Modes" description="Visual effects & challenges">
                <SettingRow
                  label="Shake Mode"
                  description="Screen shakes on errors"
                  checked={shakeMode}
                  onCheckedChange={setShakeMode}
                />
                <SettingRow
                  label="Ghost Mode"
                  description="Fading character trail"
                  checked={ghostMode}
                  onCheckedChange={setGhostMode}
                />
              </Section>

              <div className="h-px bg-border/40" />

              {/* ── Typography ── */}
              <Section icon={Type} title="Typography" description="Font and size preferences">
                <div className="px-3 space-y-3">
                  {/* Font picker button */}
                  <button className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/40 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-150">
                    <span>{font || "Playfair Display"}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>

                  {/* Font size pills */}
                  <div className="flex gap-2">
                    {FONT_SIZES.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => setFontSize(size.id)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all duration-150 uppercase tracking-wide ${
                          fontSize === size.id
                            ? "bg-primary border-primary text-primary-foreground shadow-sm"
                            : "bg-transparent border-border/50 text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/30"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              </Section>

            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-border/40 bg-muted/10 flex items-center justify-center">
              <p className="text-[10px] text-muted-foreground/50 tracking-wider uppercase">
                Changes apply instantly
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}