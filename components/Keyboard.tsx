"use client";
import { Keyboard } from "@/components/ui/keyboard";
import { useSettings } from "@/context/SettingContext";

export default function KeyboardComponent() {
  const {showKeyboard} = useSettings();
  return (
   showKeyboard ? (
      <div className="flex min-h-80 w-fit mx-auto items-center justify-center md:min-h-fit py-6 mt-16">
        <Keyboard theme="mint" enableHaptics enableSound  />
      </div>
    ) : null
  );
}