export type KeyColor = "alpha" | "mod" | "esc" | "fn";

export interface KeyDef {
  id: string;
  label: string;
  color: KeyColor;
  px: number;
  char?: string;
  isFn?: boolean;
  isSpace?: boolean;
  icon?: string;
  split?: boolean;
  upLabel?: string;
  downLabel?: string;
}
export interface KeyProps {
  keyData: KeyDef;
  pressed: boolean;
  onPress: () => void;
  onRelease: () => void;
}

export interface MacKeyboardProps {
  onKeyPress?: (char: string) => void;
  showDisplay?: boolean;
  listenToPhysicalKeys?: boolean;
  className?: string;
}