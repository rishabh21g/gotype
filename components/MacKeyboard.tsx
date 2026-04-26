"use client"
import { useState, useEffect, useCallback } from "react";


const LAYOUT = [
  // Row 0 — Function row
  [
    { id: "esc",  label: "esc",  w: "w-[46px]" },
    { id: "f1",   top: "🔆", label: "F1",   w: "w-[38px]" },
    { id: "f2",   top: "☀️", label: "F2",   w: "w-[38px]" },
    { id: "f3",   top: "⊞",  label: "F3",   w: "w-[38px]" },
    { id: "f4",   top: "⌕",  label: "F4",   w: "w-[38px]" },
    { id: "f5",   top: "🎤", label: "F5",   w: "w-[38px]" },
    { id: "f6",   top: "🌙", label: "F6",   w: "w-[38px]" },
    { id: "f7",   top: "⏮", label: "F7",   w: "w-[38px]" },
    { id: "f8",   top: "⏯", label: "F8",   w: "w-[38px]" },
    { id: "f9",   top: "⏭", label: "F9",   w: "w-[38px]" },
    { id: "f10",  top: "🔇", label: "F10",  w: "w-[38px]" },
    { id: "f11",  top: "🔉", label: "F11",  w: "w-[38px]" },
    { id: "f12",  top: "🔊", label: "F12",  w: "w-[38px]" },
    { id: "touch", label: "⏻", w: "w-[38px]", accent: true },
  ],
  // Row 1 — Number row
  [
    { id: "grave", top: "~",  label: "`",   w: "w-[46px]" },
    { id: "1",     top: "!",  label: "1",   w: "w-[46px]" },
    { id: "2",     top: "@",  label: "2",   w: "w-[46px]" },
    { id: "3",     top: "#",  label: "3",   w: "w-[46px]" },
    { id: "4",     top: "$",  label: "4",   w: "w-[46px]" },
    { id: "5",     top: "%",  label: "5",   w: "w-[46px]" },
    { id: "6",     top: "^",  label: "6",   w: "w-[46px]" },
    { id: "7",     top: "&",  label: "7",   w: "w-[46px]" },
    { id: "8",     top: "*",  label: "8",   w: "w-[46px]" },
    { id: "9",     top: "(",  label: "9",   w: "w-[46px]" },
    { id: "0",     top: ")",  label: "0",   w: "w-[46px]" },
    { id: "minus", top: "_",  label: "-",   w: "w-[46px]" },
    { id: "equal", top: "+",  label: "=",   w: "w-[46px]" },
    { id: "bksp",  label: "⌫", w: "w-[72px]" },
  ],
  // Row 2 — QWERTY
  [
    { id: "tab", label: "⇥ tab", w: "w-[72px]" },
    { id: "q",   label: "Q",     w: "w-[46px]" },
    { id: "w",   label: "W",     w: "w-[46px]" },
    { id: "e",   label: "E",     w: "w-[46px]" },
    { id: "r",   label: "R",     w: "w-[46px]" },
    { id: "t",   label: "T",     w: "w-[46px]" },
    { id: "y",   label: "Y",     w: "w-[46px]" },
    { id: "u",   label: "U",     w: "w-[46px]" },
    { id: "i",   label: "I",     w: "w-[46px]" },
    { id: "o",   label: "O",     w: "w-[46px]" },
    { id: "p",   label: "P",     w: "w-[46px]" },
    { id: "lbr", top: "{", label: "[", w: "w-[46px]" },
    { id: "rbr", top: "}", label: "]", w: "w-[46px]" },
    { id: "bsl", top: "|", label: "\\", w: "w-[46px]" },
  ],
  // Row 3 — Home row
  [
    { id: "caps",   label: "⇪ caps lock", w: "w-[84px]" },
    { id: "a",      label: "A",  w: "w-[46px]" },
    { id: "s",      label: "S",  w: "w-[46px]" },
    { id: "d",      label: "D",  w: "w-[46px]" },
    { id: "f",      label: "F",  w: "w-[46px]" },
    { id: "g",      label: "G",  w: "w-[46px]" },
    { id: "h",      label: "H",  w: "w-[46px]" },
    { id: "j",      label: "J",  w: "w-[46px]" },
    { id: "k",      label: "K",  w: "w-[46px]" },
    { id: "l",      label: "L",  w: "w-[46px]" },
    { id: "semi",   top: ":", label: ";", w: "w-[46px]" },
    { id: "quote",  top: '"', label: "'", w: "w-[46px]" },
    { id: "enter",  label: "return ↵", w: "w-[84px]" },
  ],
  // Row 4 — Shift row
  [
    { id: "lshift", label: "⇧", w: "w-[112px]" },
    { id: "z",      label: "Z",  w: "w-[46px]" },
    { id: "x",      label: "X",  w: "w-[46px]" },
    { id: "c",      label: "C",  w: "w-[46px]" },
    { id: "v",      label: "V",  w: "w-[46px]" },
    { id: "b",      label: "B",  w: "w-[46px]" },
    { id: "n",      label: "N",  w: "w-[46px]" },
    { id: "m",      label: "M",  w: "w-[46px]" },
    { id: "comma",  top: "<", label: ",", w: "w-[46px]" },
    { id: "dot",    top: ">", label: ".", w: "w-[46px]" },
    { id: "slash",  top: "?", label: "/", w: "w-[46px]" },
    { id: "rshift", label: "⇧", w: "w-[112px]" },
  ],
  // Row 5 — Bottom row
  [
    { id: "fn",      label: "fn",      w: "w-[46px]" },
    { id: "ctrl",    label: "control", w: "w-[54px]" },
    { id: "lopt",    label: "⌥ option", w: "w-[60px]" },
    { id: "lcmd",    label: "⌘ command", w: "w-[84px]" },
    { id: "space",   label: "",        w: "w-[256px]", isSpace: true },
    { id: "rcmd",    label: "⌘ command", w: "w-[84px]" },
    { id: "ropt",    label: "⌥ option", w: "w-[60px]" },
    { id: "left",    label: "◀",       w: "w-[30px]", half: true },
    { id: "updown",  upLabel: "▲", downLabel: "▼", w: "w-[30px]", split: true },
    { id: "right",   label: "▶",       w: "w-[30px]", half: true },
  ],
];

// ─── Key component ─────────────────────────────────────────────────────────

function Key({ keyData, pressed, onPress, onRelease }) {
  const base =
    "relative select-none cursor-pointer flex flex-col items-center justify-center rounded-[6px] transition-all duration-75 overflow-hidden";

  const normal =
    "bg-[#1c1c1e] text-[#d1d1d6] border border-[#3a3a3c] shadow-[0_2px_0_#000,inset_0_1px_0_rgba(255,255,255,0.08)]";

  const accent =
    "bg-[#3a3a3c] text-[#f5f5f7] border border-[#555] shadow-[0_2px_0_#000,inset_0_1px_0_rgba(255,255,255,0.15)]";

  const pressedStyle = pressed
    ? "translate-y-[2px] shadow-[0_0px_0_#000,inset_0_1px_0_rgba(255,255,255,0.05)]"
    : "";

  const colorClass = keyData.accent ? accent : normal;
  const h = keyData.split ? "h-[40px]" : "h-[40px]";

  if (keyData.split) {
    return (
      <div className={`${keyData.w} flex flex-col gap-[3px]`}>
        <div
          className={`${base} ${colorClass} ${pressed ? pressedStyle : ""} h-[18px] w-full`}
          onMouseDown={onPress} onMouseUp={onRelease} onMouseLeave={onRelease}
          onTouchStart={(e) => { e.preventDefault(); onPress(); }}
          onTouchEnd={onRelease}
        >
          <span className="text-[9px] font-medium leading-none">{keyData.upLabel}</span>
        </div>
        <div
          className={`${base} ${colorClass} h-[18px] w-full`}
        >
          <span className="text-[9px] font-medium leading-none">{keyData.downLabel}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${base} ${colorClass} ${pressedStyle} ${keyData.w} ${h}`}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      onTouchStart={(e) => { e.preventDefault(); onPress(); }}
      onTouchEnd={onRelease}
    >
      {keyData.top && (
        <span className="text-[8px] text-[#6e6e73] leading-none mb-[1px]">{keyData.top}</span>
      )}
      <span
        className={`leading-none font-medium ${
          keyData.isSpace
            ? "text-[10px]"
            : keyData.label.length > 5
            ? "text-[8px]"
            : keyData.label.length > 2
            ? "text-[9px]"
            : "text-[11px]"
        }`}
      >
        {keyData.label}
      </span>

      {/* press ripple */}
      {pressed && (
        <span className="absolute inset-0 bg-white/5 rounded-[6px]" />
      )}
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

/**
 * MacKeyboard
 *
 * Props:
 * - onKeyPress: (key: string) => void
 * - showDisplay: boolean (default true)
 * - listenToPhysicalKeys: boolean (default true)
 * - className: string
 */
export default function MacKeyboard({
  onKeyPress,
  showDisplay = true,
  listenToPhysicalKeys = true,
  className = "",
}) {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [typed, setTyped] = useState("");

  const pressKey = useCallback(
    (id, char) => {
      setPressedKeys((p) => new Set([...p, id]));
      if (char === "Backspace") {
        setTyped((t) => t.slice(0, -1));
      } else if (char && char.length === 1) {
        setTyped((t) => t + char);
      }
      onKeyPress?.(char);
    },
    [onKeyPress]
  );

  const releaseKey = useCallback((id) => {
    setPressedKeys((p) => {
      const n = new Set(p);
      n.delete(id);
      return n;
    });
  }, []);

  useEffect(() => {
    if (!listenToPhysicalKeys) return;
    const down = (e) => {
      LAYOUT.forEach((row) =>
        row.forEach((k) => {
          const match =
            k.label?.toLowerCase() === e.key?.toLowerCase() ||
            (k.isSpace && e.key === " ") ||
            (k.id === "bksp" && e.key === "Backspace") ||
            (k.id === "enter" && e.key === "Enter");
          if (match)
            pressKey(k.id, k.isSpace ? " " : k.id === "bksp" ? "Backspace" : k.label);
        })
      );
    };
    const up = (e) => {
      LAYOUT.forEach((row) =>
        row.forEach((k) => {
          const match =
            k.label?.toLowerCase() === e.key?.toLowerCase() ||
            (k.isSpace && e.key === " ") ||
            (k.id === "bksp" && e.key === "Backspace") ||
            (k.id === "enter" && e.key === "Enter");
          if (match) releaseKey(k.id);
        })
      );
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [pressKey, releaseKey, listenToPhysicalKeys]);

  return (
    <div className={`inline-flex flex-col items-center gap-3 p-6  rounded-2xl shadow-2xl ${className}`}>
      {/* Silver MacBook chassis */}
      <div className="bg-[#9ea3a8] rounded-xl p-[14px] shadow-inner border border-[#8a8e93]">
        <div className="bg-[#1c1c1e] rounded-xl p-[10px] flex flex-col gap-[4px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]">

          {/* Display */}
          {showDisplay && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="flex-1 bg-[#0a0a0b] border border-[#2a2a2c] rounded-md px-3 py-1.5 flex items-center gap-1 min-h-[30px]">
                <span className="text-[#30d158] font-mono text-xs tracking-widest">{typed}</span>
                <span className="w-[1.5px] h-3 bg-[#30d158] animate-pulse ml-0.5" />
              </div>
              <button
                onClick={() => setTyped("")}
                className="text-[10px] text-[#6e6e73] border border-[#3a3a3c] rounded px-2 py-1 hover:text-[#aeaeb2] hover:border-[#555] transition-colors bg-[#1c1c1e]"
              >
                clear
              </button>
            </div>
          )}

          {/* Keyboard rows */}
          {LAYOUT.map((row, ri) => (
            <div key={ri} className="flex gap-[4px] items-end">
              {row.map((k) => (
                <Key
                  key={k.id}
                  keyData={k}
                  pressed={pressedKeys.has(k.id)}
                  onPress={() =>
                    pressKey(
                      k.id,
                      k.isSpace ? " " : k.id === "bksp" ? "Backspace" : k.label
                    )
                  }
                  onRelease={() => releaseKey(k.id)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
