import { KeyColor, KeyDef } from "@/types/keys";

export const ROW_FN: KeyDef[] = [
  { id: "esc",  label: "esc",  color: "esc", px: 46, isFn: true, char: "Escape" },
  { id: "f1",   label: "F1",   color: "fn",  px: 42, isFn: true, icon: "☀" },
  { id: "f2",   label: "F2",   color: "fn",  px: 42, isFn: true, icon: "☀☀" },
  { id: "f3",   label: "F3",   color: "fn",  px: 42, isFn: true, icon: "⊞" },
  { id: "f4",   label: "F4",   color: "fn",  px: 42, isFn: true, icon: "⌕" },
  { id: "f5",   label: "F5",   color: "mod", px: 42, isFn: true, icon: "🎤" },
  { id: "f6",   label: "F6",   color: "mod", px: 42, isFn: true, icon: "☽" },
  { id: "f7",   label: "F7",   color: "mod", px: 42, isFn: true, icon: "⏮" },
  { id: "f8",   label: "F8",   color: "mod", px: 42, isFn: true, icon: "⏭" },
  { id: "f9",   label: "F9",   color: "mod", px: 42, isFn: true, icon: "⏭⏭" },
  { id: "f10",  label: "F10",  color: "fn",  px: 42, isFn: true, icon: "🔇" },
  { id: "f11",  label: "F11",  color: "fn",  px: 42, isFn: true, icon: "🔉" },
  { id: "f12",  label: "F12",  color: "fn",  px: 42, isFn: true, icon: "🔊" },
  { id: "del",  label: "del",  color: "mod", px: 42, isFn: true, char: "Delete" },
  { id: "lght", label: "☀",   color: "mod", px: 42, isFn: true },
];

export const ROW_NUM: KeyDef[] = [
  { id: "tilde", label: "`",  color: "alpha", px: 46, split: true, upLabel: "~",  downLabel: "`",  char: "`" },
  { id: "k1",    label: "1",  color: "alpha", px: 42, split: true, upLabel: "!",  downLabel: "1",  char: "1" },
  { id: "k2",    label: "2",  color: "alpha", px: 42, split: true, upLabel: "@",  downLabel: "2",  char: "2" },
  { id: "k3",    label: "3",  color: "alpha", px: 42, split: true, upLabel: "#",  downLabel: "3",  char: "3" },
  { id: "k4",    label: "4",  color: "alpha", px: 42, split: true, upLabel: "$",  downLabel: "4",  char: "4" },
  { id: "k5",    label: "5",  color: "alpha", px: 42, split: true, upLabel: "%",  downLabel: "5",  char: "5" },
  { id: "k6",    label: "6",  color: "alpha", px: 42, split: true, upLabel: "^",  downLabel: "6",  char: "6" },
  { id: "k7",    label: "7",  color: "alpha", px: 42, split: true, upLabel: "&",  downLabel: "7",  char: "7" },
  { id: "k8",    label: "8",  color: "alpha", px: 42, split: true, upLabel: "*",  downLabel: "8",  char: "8" },
  { id: "k9",    label: "9",  color: "alpha", px: 42, split: true, upLabel: "(",  downLabel: "9",  char: "9" },
  { id: "k0",    label: "0",  color: "alpha", px: 42, split: true, upLabel: ")",  downLabel: "0",  char: "0" },
  { id: "kmn",   label: "-",  color: "alpha", px: 42, split: true, upLabel: "_",  downLabel: "-",  char: "-" },
  { id: "keq",   label: "=",  color: "alpha", px: 42, split: true, upLabel: "+",  downLabel: "=",  char: "=" },
  { id: "bksp",  label: "←",  color: "mod",   px: 84, char: "Backspace" },
  { id: "pgup",  label: "pgup", color: "mod", px: 42 },
];

export const ROW_Q: KeyDef[] = [
  { id: "tab",  label: "tab",  color: "mod",   px: 66, char: "\t" },
  { id: "q",    label: "Q",    color: "alpha", px: 42 },
  { id: "w",    label: "W",    color: "alpha", px: 42 },
  { id: "e",    label: "E",    color: "alpha", px: 42 },
  { id: "r",    label: "R",    color: "alpha", px: 42 },
  { id: "t",    label: "T",    color: "alpha", px: 42 },
  { id: "y",    label: "Y",    color: "alpha", px: 42 },
  { id: "u",    label: "U",    color: "alpha", px: 42 },
  { id: "i",    label: "I",    color: "alpha", px: 42 },
  { id: "o",    label: "O",    color: "alpha", px: 42 },
  { id: "p",    label: "P",    color: "alpha", px: 42 },
  { id: "lbr",  label: "[",    color: "alpha", px: 42, split: true, upLabel: "{", downLabel: "[" },
  { id: "rbr",  label: "]",    color: "alpha", px: 42, split: true, upLabel: "}", downLabel: "]" },
  { id: "bsl",  label: "\\",   color: "alpha", px: 48, split: true, upLabel: "|", downLabel: "\\" },
  { id: "pgdn", label: "pgdn", color: "mod",   px: 42 },
];

export const ROW_A: KeyDef[] = [
  { id: "caps",  label: "caps lock", color: "mod",   px: 78 },
  { id: "a",     label: "A",         color: "alpha", px: 42 },
  { id: "s",     label: "S",         color: "alpha", px: 42 },
  { id: "d",     label: "D",         color: "alpha", px: 42 },
  { id: "f",     label: "F",         color: "alpha", px: 42 },
  { id: "g",     label: "G",         color: "alpha", px: 42 },
  { id: "h",     label: "H",         color: "alpha", px: 42 },
  { id: "j",     label: "J",         color: "alpha", px: 42 },
  { id: "k",     label: "K",         color: "alpha", px: 42 },
  { id: "l",     label: "L",         color: "alpha", px: 42 },
  { id: "semi",  label: ";",         color: "alpha", px: 42, split: true, upLabel: ":", downLabel: ";" },
  { id: "quote", label: "'",         color: "alpha", px: 42, split: true, upLabel: '"', downLabel: "'" },
  { id: "ret",   label: "return",    color: "mod",   px: 90, char: "\n" },
  { id: "home",  label: "home",      color: "mod",   px: 42 },
];

export const ROW_Z: KeyDef[] = [
  { id: "lsft",  label: "shift", color: "mod",   px: 96 },
  { id: "z",     label: "Z",     color: "alpha", px: 42 },
  { id: "x",     label: "X",     color: "alpha", px: 42 },
  { id: "c",     label: "C",     color: "alpha", px: 42 },
  { id: "v",     label: "V",     color: "alpha", px: 42 },
  { id: "b",     label: "B",     color: "alpha", px: 42 },
  { id: "n",     label: "N",     color: "alpha", px: 42 },
  { id: "m",     label: "M",     color: "alpha", px: 42 },
  { id: "com",   label: ",",     color: "alpha", px: 42, split: true, upLabel: "<", downLabel: "," },
  { id: "dot",   label: ".",     color: "alpha", px: 42, split: true, upLabel: ">", downLabel: "." },
  { id: "fsl",   label: "/",     color: "alpha", px: 42, split: true, upLabel: "?", downLabel: "/" },
  { id: "rsft",  label: "shift", color: "mod",   px: 78 },
  { id: "up",    label: "^",     color: "alpha", px: 42, char: "ArrowUp" },
  { id: "end",   label: "end",   color: "mod",   px: 42 },
];

export const ROW_MOD: KeyDef[] = [
  { id: "ctrl",   label: "ctrl",   color: "mod",   px: 48 },
  { id: "opt",    label: "option", color: "mod",   px: 48 },
  { id: "lcmd",   label: "⌘",      color: "mod",   px: 54 },
  { id: "space",  label: "",       color: "alpha", px: 246, isSpace: true, char: " " },
  { id: "rcmd",   label: "⌘",      color: "mod",   px: 54 },
  { id: "fn",     label: "fn",     color: "mod",   px: 48 },
  { id: "rctrl",  label: "ctrl",   color: "mod",   px: 48 },
  { id: "left",   label: "<",      color: "alpha", px: 42, char: "ArrowLeft" },
  { id: "down",   label: "v",      color: "alpha", px: 42, char: "ArrowDown" },
  { id: "right",  label: ">",      color: "alpha", px: 42, char: "ArrowRight" },
];

export const LAYOUT: KeyDef[][] = [ROW_FN, ROW_NUM, ROW_Q, ROW_A, ROW_Z, ROW_MOD];

export const COLOR: Record<KeyColor, string> = {
  alpha: "bg-[#dcdcdc] text-[#222] border border-[#b0b0b0] shadow-[0_4px_0_#666,inset_0_1px_0_rgba(255,255,255,0.9)]",
  mod:   "bg-[#3c3c40] text-[#c8c8cc] border border-[#555558] shadow-[0_4px_0_#111,inset_0_1px_0_rgba(255,255,255,0.12)]",
  esc:   "bg-[#2bbb96] text-white border border-[#22a07f] shadow-[0_4px_0_#0d6b55,inset_0_1px_0_rgba(255,255,255,0.3)]",
  fn:    "bg-[#323236] text-[#aaa] border border-[#484848] shadow-[0_3px_0_#111,inset_0_1px_0_rgba(255,255,255,0.08)]",
};

export const PRESSED_CLS = "translate-y-[3px] !shadow-[0_1px_0_#111] brightness-[0.82]"