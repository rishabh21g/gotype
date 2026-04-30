"use client"
import React, { useState } from 'react'
import Header from '@/components/Header'
import { SettingsPanel } from '@/components/SettingsPanel'
import KeyboardComponent from '@/components/Keyboard'
import TypingTestConfig from '@/components/TypingTestConfig'
import TypingArea from '@/components/TypingArea'
import { Button } from '@/components/ui/button'

const page = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <main className='flex flex-col gap-2 w-full relative'>
      <Header />
      <SettingsPanel />      
      <TypingTestConfig/>
      <TypingArea />
      <KeyboardComponent />
    </main>
  )
}

export default page