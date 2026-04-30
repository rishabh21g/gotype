import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";

export function FinishedOverlay({
  wpm,
  accuracy,
  onRestart,
}: {
  wpm: number;
  accuracy: number;
  onRestart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", damping: 22, stiffness: 260 }}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6"
    >
      <div className="flex items-center gap-2 text-primary">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-semibold tracking-widest uppercase">Test complete</span>
      </div>

      <div className="flex items-center gap-10">
        <div className="text-center">
          <p className="text-5xl font-bold tabular-nums text-foreground">{wpm}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">wpm</p>
        </div>
        <div className="w-px h-12 bg-border/60" />
        <div className="text-center">
          <p className="text-5xl font-bold tabular-nums text-foreground">{accuracy}</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">accuracy</p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center gap-2 px-5 py-2 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/60 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-150"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Restart
      </button>
    </motion.div>
  );
}
