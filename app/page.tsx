import KeyboardComponent from '@/components/Keyboard'
import MainText from '@/components/MainText'
import { SettingsSidebar } from '@/components/Settings'
import React from 'react'
const page = () => {
  return (
    <main className='flex flex-col gap-2 w-full '>
      {/* <SettingsSidebar/> */}
      <MainText />
      <KeyboardComponent />

    </main>
  )
}

export default page