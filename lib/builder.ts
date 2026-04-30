import { codeSnippets } from "@/constants/codes";
import { sampleQuotes } from "@/constants/quotes";
import { sampleText } from "@/constants/text";

export function buildWordList(
  mode: string,
  wordCount: string,
  quoteSize: "short" | "medium" | "long",
  language: string,
  punctuation: boolean,
  numbers: boolean,
): string[] {
  const addExtras = (words: string[]) => {
    let pool = [...words];
    if (numbers) {
      const nums = ["1", "2", "3", "42", "100", "2024", "0", "99"];
      pool = pool.flatMap((w, i) => (i % 7 === 0 ? [nums[i % nums.length], w] : [w]));
    }
    if (punctuation) {
      const puncts = [",", ".", "!", "?", ";", ":"];
      pool = pool.map((w, i) => (i % 5 === 0 ? w + puncts[i % puncts.length] : w));
    }
    return pool;
  };

  if (mode === "words") {
    const count = Math.max(10, parseInt(wordCount) || 60);
    const base  = sampleText.split(" ");
    const words: string[] = [];
    while (words.length < count) words.push(...base);
    return addExtras(words.slice(0, count));
  }

  if (mode === "time") {
    // For time mode, load a generous buffer (300 words) — timer controls the end
    const base  = sampleText.split(" ");
    const words: string[] = [];
    while (words.length < 300) words.push(...base);
    return addExtras(words.slice(0, 300));
  }

  if (mode === "quote") {
    const pool = sampleQuotes?.[quoteSize] ?? sampleQuotes?.medium ?? [sampleText];
    const text = pool[Math.floor(Math.random() * pool.length)];
    return addExtras(text.split(" "));
  }

  if (mode === "code") {
    const pool = codeSnippets?.[language] ?? codeSnippets?.["JavaScript"] ?? [sampleText];
    const snippet = pool[Math.floor(Math.random() * pool.length)];
    return snippet.split(" ");
  }

  return sampleText.split(" ");
}