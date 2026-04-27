"use client";
import { Keyboard, KeyboardInteractionEvent } from "@/components/ui/keyboard";

export default function KeyboardComponent() {
  return (
    <div className="flex min-h-96 w-full items-center justify-center py-10 md:min-h-180">
      <Keyboard theme="royal" enableHaptics enableSound onKeyEvent={(event: KeyboardInteractionEvent) => {
        console.log(event.code, event.phase, event.source);
      }} />
    </div>
  );
}