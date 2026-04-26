"use client";

import { COLOR, LAYOUT, PRESSED_CLS } from "@/constants/KEYS";
import { KeyDef, KeyProps, MacKeyboardProps } from "@/types/keys";
import { useState, useEffect, useCallback } from "react";


function labelSizeCls(label: string, isSpace?: boolean): string {
  if (isSpace) return "text-[9px]";
  if (label.length > 7) return "text-[7px]";
  if (label.length > 5) return "text-[7.5px]";
  if (label.length > 3) return "text-[8.5px]";
  return "text-[13px]";
}

// ─── Key ─────────────────────────────────────────────────────────────────────

function Key({ keyData, pressed, onPress, onRelease }: KeyProps) {
  const base = "relative flex flex-col items-center justify-center rounded-[5px] cursor-pointer select-none transition-all duration-[55ms] flex-shrink-0";
  const colorCls = COLOR[keyData.color];
  const h = keyData.isFn ? "h-[32px]" : "h-[42px]";
  const handlers = {
    onMouseDown: onPress, onMouseUp: onRelease, onMouseLeave: onRelease,
    onTouchStart: (e: React.TouchEvent) => { e.preventDefault(); onPress(); },
    onTouchEnd: onRelease,
  };

  if (keyData.split) {
    const half = `flex items-center justify-center rounded-[4px] text-[9px] font-medium leading-none select-none cursor-pointer flex-shrink-0 ${colorCls}`;
    return (
      <div style={{ width: keyData.px }} className="flex flex-col gap-0.75 shrink-0">
        <div className={`${half} h-4.75 ${pressed ? "translate-y-px brightness-[0.82] shadow-[0_0px_0_#000]" : ""}`}
          style={{ width: keyData.px }} {...handlers}>
          {keyData.upLabel}
        </div>
        <div className={`${half} h-4.75 pointer-events-none`} style={{ width: keyData.px }}>
          {keyData.downLabel}
        </div>
      </div>
    );
  }

  return (
    <div className={`${base} ${colorCls} ${h} ${pressed ? PRESSED_CLS : ""}`}
      style={{ width: keyData.px }} {...handlers}>
      {keyData.icon ? (
        <>
          <span className="text-[12px] leading-none mb-0.5">{keyData.icon}</span>
          <span className="text-[7px] text-[#888] leading-none">{keyData.label}</span>
        </>
      ) : (
        <span className={`font-medium leading-none tracking-tight ${labelSizeCls(keyData.label, keyData.isSpace)} ${keyData.isSpace ? "text-transparent" : ""}`}>
          {keyData.label}
        </span>
      )}
    </div>
  );
}


export default function MacKeyboard({
  onKeyPress, showDisplay = true, listenToPhysicalKeys = true, className = "",
}: MacKeyboardProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [typed, setTyped] = useState<string>("");

  const getChar = (k: KeyDef) => k.char ?? (k.isSpace ? " " : k.label);

  const pressKey = useCallback((id: string, char: string) => {
    setPressedKeys((p) => new Set([...p, id]));
    if (char === "Backspace") setTyped((t) => t.slice(0, -1));
    else if (char?.length === 1) setTyped((t) => t + char);
    onKeyPress?.(char);
  }, [onKeyPress]);

  const releaseKey = useCallback((id: string) => {
    setPressedKeys((p) => { const n = new Set(p); n.delete(id); return n; });
  }, []);

  useEffect(() => {
    if (!listenToPhysicalKeys) return;
    const matchKey = (k: KeyDef, e: KeyboardEvent) =>
      (k.label?.toLowerCase() === e.key?.toLowerCase()) ||
      (k.isSpace && e.key === " ") ||
      (k.id === "bksp" && e.key === "Backspace") ||
      (k.id === "ret"  && e.key === "Enter") ||
      (k.id === "left" && e.key === "ArrowLeft") ||
      (k.id === "right"&& e.key === "ArrowRight") ||
      (k.id === "up"   && e.key === "ArrowUp") ||
      (k.id === "down" && e.key === "ArrowDown") ||
      (k.split && k.downLabel === e.key);
    const down = (e: KeyboardEvent) => LAYOUT.flat().forEach((k) => { if (matchKey(k, e)) pressKey(k.id, getChar(k)); });
    const up   = (e: KeyboardEvent) => LAYOUT.flat().forEach((k) => { if (matchKey(k, e)) releaseKey(k.id); });
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [pressKey, releaseKey, listenToPhysicalKeys]);

  return (
    <div className={`flex flex-col items-center bg-[#111] rounded-xl p-5 ${className}`}>
      {showDisplay && (
        <div className="flex items-center gap-2 mb-3 w-full">
          <div className="flex-1 bg-[#0a0a0c] border border-[#222] rounded-md px-3 py-1.5 flex items-center gap-1 min-h-7">
            <span className="text-[#39d5a0] font-mono text-[11px] tracking-widest">{typed}</span>
            <span className="w-[1.5px] h-3 bg-[#39d5a0] ml-1 animate-pulse" />
          </div>
          <button onClick={() => setTyped("")}
            className="text-[9px] text-[#666] bg-[#1a1a1c] border border-[#333] rounded px-2 py-0.75 hover:text-[#aaa] transition-colors">
            clear
          </button>
        </div>
      )}
      <div className="rounded-[10px] p-2.5 flex flex-col gap-0.75"
        style={{ background: "#2e2e32", boxShadow: "0 6px 24px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.06),0 0 0 1px rgba(0,0,0,.8)" }}>
        {LAYOUT.map((row, ri) => (
          <div key={ri} className="flex items-end gap-0.75">
            {row.map((k) => (
              <Key key={k.id} keyData={k} pressed={pressedKeys.has(k.id)}
                onPress={() => pressKey(k.id, getChar(k))}
                onRelease={() => releaseKey(k.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}