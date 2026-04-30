import { motion } from "framer-motion";
import { Timer } from "lucide-react";


export function StatsBar({
  wpm,
  accuracy,
  timeLeft,
  mode,
  realtimeWpm,
}: {
  wpm: number;
  accuracy: number;
  timeLeft: number;
  mode: string;
  realtimeWpm: boolean;
}) {
  if (!realtimeWpm) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-5 mb-4 text-xs font-mono text-muted-foreground select-none"
    >
      {mode === "time" && (
        <span className="flex items-center gap-1.5 text-primary font-bold text-sm tabular-nums">
          <Timer className="w-3.5 h-3.5" />
          {timeLeft}s
        </span>
      )}
      <span>
        <span className="text-foreground/80 font-semibold">{wpm}</span> wpm
      </span>
      <span>
        <span className="text-foreground/80 font-semibold">{accuracy}</span>% acc
      </span>
    </motion.div>
  );
}