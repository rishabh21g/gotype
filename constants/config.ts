import { Clock, Type, Quote, Mountain, Code, Wrench, Timer, CaseSensitive, Code2 } from "lucide-react";

export const CONFIG = [
    { id: 'time', icon: Clock, label: 'time' },
    { id: 'words', icon: Type, label: 'words' },
    { id: 'quote', icon: Quote, label: 'quote' },
    { id: 'zen', icon: Mountain, label: 'zen' },
    { id: 'code', icon: Code, label: 'code' },
    { id: 'custom', icon: Wrench, label: 'custom' },
];

export const MODES = [
  { id: 'time',   label: 'Time',   icon: Timer },
  { id: 'words',  label: 'Words',  icon: CaseSensitive },
  { id: 'quote',  label: 'Quote',  icon: Quote },
  { id: 'code',   label: 'Code',   icon: Code2 },
]

export const TIME_OPTIONS   = ['15', '30', '60']
export const WORDS_OPTIONS  = ['30', '60', '90']
export const QUOTE_OPTIONS  = ['short', 'medium', 'long'] as const
export const CODE_LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Rust',
  'Go', 'C++', 'Java', 'Kotlin', 'Swift',
  'Ruby', 'PHP', 'C#', 'Haskell', 'Lua',
]