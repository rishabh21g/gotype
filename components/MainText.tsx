"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  AtSign, 
  Hash, 
  Clock, 
  Type, 
  Quote, 
  Mountain, 
  Code, 
  Wrench, 
  RotateCw 
} from 'lucide-react';

export default function MainText() {
  const [activeMode, setActiveMode] = useState('time');
  const [activeDuration, setActiveDuration] = useState('60');

  // Dummy text for the typing interface
  const sampleText = "tire 9652 five from an prove rope between tube log as better 5603 smell sharp 4924 end head yet! winter carry valley plan 5602 discuss 3109 your use middle differ! except choose behind 6900 best eight stay every! Form";
  
  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-10 px-4 space-y-12">
      {/* Search / Config Toolbar */}
      <div className="flex flex-wrap items-center justify-center bg-zinc-900/50 rounded-xl p-2 gap-2 text-zinc-400 text-sm font-medium">
        {/* Modifiers */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 gap-2 text-primary hover:text-primary">
            <AtSign className="w-4 h-4" /> punctuation
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-2 text-primary hover:text-primary">
            <Hash className="w-4 h-4" /> numbers
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-2 bg-zinc-700" />

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8">easy</Button>
          <Button variant="ghost" size="sm" className="h-8 text-primary hover:text-primary">hard</Button>
        </div>

        <Separator orientation="vertical" className="h-6 mx-2 bg-zinc-700" />

        {/* Modes */}
        <div className="flex items-center gap-1">
          {[
            { id: 'time', icon: Clock, label: 'time' },
            { id: 'words', icon: Type, label: 'words' },
            { id: 'quote', icon: Quote, label: 'quote' },
            { id: 'zen', icon: Mountain, label: 'zen' },
            { id: 'code', icon: Code, label: 'code' },
            { id: 'custom', icon: Wrench, label: 'custom' },
          ].map((mode) => (
            <Button 
              key={mode.id}
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveMode(mode.id)}
              className={`h-8 gap-2 ${activeMode === mode.id ? 'text-primary' : 'text-zinc-400 hover:text-zinc-300'}`}
            >
              <mode.icon className="w-4 h-4" /> {mode.label}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6 mx-2 bg-zinc-700" />

        {/* Duration / Amounts */}
        <div className="flex items-center gap-1">
          {['15', '30', '60', '120'].map((duration) => (
            <Button 
              key={duration}
              variant="ghost" 
              size="sm" 
              onClick={() => setActiveDuration(duration)}
              className={`h-8 ${activeDuration === duration ? 'text-primary' : 'text-zinc-400 hover:text-zinc-300'}`}
            >
              {duration}
            </Button>
          ))}
          <Button variant="ghost" size="sm" className="h-8">
            <Wrench className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Typing Area */}
      <div className="w-full text-3xl leading-relaxed tracking-wide text-zinc-500 font-mono relative focus:outline-none" tabIndex={0}>
        <div className="text-left relative">
          {/* Simulated Caret */}
          <span className="absolute left-0 top-1 bottom-1 w-0.5 bg-primary animate-pulse" />
          <p>{sampleText}</p>
        </div>
      </div>

      {/* Restart Controls */}
      <div className="flex flex-col items-center gap-4 text-zinc-500">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-zinc-800 hover:text-zinc-300">
          <RotateCw className="w-5 h-5" />
        </Button>
        <div className="text-xs">
          <span className="bg-zinc-800 px-2 py-1 rounded text-zinc-400 mr-1">tab</span> + 
          <span className="bg-zinc-800 px-2 py-1 rounded text-zinc-400 mx-1">enter</span> 
          - restart test
        </div>
      </div>
    </div>
  );
}