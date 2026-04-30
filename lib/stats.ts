export function calculateWpm(correctWords: number, elapsedSec: number): number {
  const minutes = Math.max(elapsedSec / 60, 0.01);
  return Math.round(correctWords / minutes);
}

export function calculateAccuracy(totalTyped: number, totalErrors: number): number {
  if (totalTyped === 0) return 100;
  return Math.max(0, Math.round(((totalTyped - totalErrors) / totalTyped) * 100));
}