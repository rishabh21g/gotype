import { COLOR, PRESSED_CLS } from "@/constants/KEYS";
import { KeyProps } from "@/types/keys";

function labelSizeCls(label: string, isSpace?: boolean): string {
  if (isSpace) return "text-[9px]";
  if (label.length > 7) return "text-[7px]";
  if (label.length > 5) return "text-[7.5px]";
  if (label.length > 3) return "text-[8.5px]";
  return "text-[13px]";
}
export function Key({ keyData, pressed, onPress, onRelease }: KeyProps) {
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
