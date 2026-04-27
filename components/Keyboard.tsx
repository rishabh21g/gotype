"use client";
import { Keyboard, KeyboardInteractionEvent } from "@/components/ui/keyboard";

export default function KeyboardComponent() {
  return (
    <div className="flex min-h-80 w-fit mx-auto items-center justify-center md:min-h-fit py-6">
      <Keyboard theme="classic" enableHaptics enableSound  />
    </div>
  );
}