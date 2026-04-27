import KeyboardComponent from '@/components/Keyboard'
import MainText from '@/components/TypingArea'
import { SettingsSidebar } from '@/components/Settings'
import TypingTestConfig from '@/components/TypingTestConfig'
import React from 'react'
import TypingArea from '@/components/TypingArea'
const page = () => {
  return (
    <main className='flex flex-col gap-2 w-full '>
      <TypingTestConfig/>
      <TypingArea />
      <KeyboardComponent />

    </main>
  )
}

export default page