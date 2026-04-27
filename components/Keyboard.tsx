"use client";
import { Keyboard, KeyboardInteractionEvent } from "@/components/ui/keyboard";

export default function KeyboardComponent() {
  return (
    <div className="flex min-h-80 w-fit mx-auto items-center justify-center md:min-h-fit py-6">
      <Keyboard theme="sand" enableHaptics enableSound onKeyEvent={(event: KeyboardInteractionEvent) => {
        console.log(event.code, event.phase, event.source);
      }} />
    </div>
  );
}