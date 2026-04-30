export interface ConfigContextType {
  activeMode: string;
  setActiveMode: (mode: string) => void;
  punctuation: boolean;
  setPunctuation: (val: boolean | ((prev: boolean) => boolean)) => void;
  numbers: boolean;
  setNumbers: (val: boolean | ((prev: boolean) => boolean)) => void;
  toughness: 'easy' | 'hard';
  setToughness: (val: 'easy' | 'hard') => void;
  time: string;
  setTime: (val: string) => void;
  customTimeOpen: boolean;
  setCustomTimeOpen: (val: boolean) => void;
  words: string;
  setWords: (val: string) => void;
  customWordsOpen: boolean;
  setCustomWordsOpen: (val: boolean) => void;
  quote: 'short' | 'medium' | 'long';
  setQuote: (val: 'short' | 'medium' | 'long') => void;
  language: string;
  setLanguage: (val: string) => void;
}