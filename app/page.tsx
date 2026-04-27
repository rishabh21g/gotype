import KeyboardComponent from '@/components/Keyboard'
import TypingTestConfig from '@/components/TypingTestConfig'
import React from 'react'
import TypingArea from '@/components/TypingArea'
import Header from '@/components/Header'
const page = () => {
  return (
    <main className='flex flex-col gap-2 w-screen min-h-screen py-6'>
      <Header/>
      <TypingTestConfig/>
      <TypingArea />
      <KeyboardComponent />
    </main>
  )
}

export default page