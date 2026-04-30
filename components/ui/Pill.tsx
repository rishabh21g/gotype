import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
function Pill({
  active,
  layoutId,
  onClick,
  children,
  className,
}: {
  active: boolean
  layoutId: string
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative h-8 px-3 text-xs font-semibold rounded-lg transition-colors duration-150 z-10',
        active
          ? 'text-primary'
          : 'text-muted-foreground hover:text-foreground',
        className,
      )}
    >
      {active && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 bg-background rounded-lg border border-border/60 shadow-sm -z-10"
          transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
        />
      )}
      {children}
    </button>
  )
}

export default Pill