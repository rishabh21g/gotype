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


// API Reference
// Prop

// Type

// Default

// Description

// className
// string
// undefined
// Adds classes to the root keyboard container.

// theme
// "classic" | "mint" | "royal" | "dolch" | "sand" | "scarlet"
// "classic"
// Selects one of the built-in keyboard themes.

// enableHaptics
// boolean
// true
// Turns haptic feedback on supported devices on or off.

// enableSound
// boolean
// true
// Turns mechanical key sound playback on or off.

// soundUrl
// string
// "/sounds/sound.ogg"
// Path to the keyboard audio sprite file.

// onKeyEvent
// (event: KeyboardInteractionEvent) => void
// undefined
// Fires on every key down/up from physical or pointer input.

// KeyboardInteractionEvent
// Field

// Type

// Description

// code
// string
// KeyboardEvent code, for example KeyA, Enter, ArrowLeft.

// phase
// "down" | "up"
// Whether the interaction is key press or key release.

// source
// "physical" | "pointer"
// Physical keyboard event or key click/touch on UI.

