"use client"
import Header from '@/components/Header'
import { SettingsPanel } from '@/components/SettingsPanel'
import KeyboardComponent from '@/components/Keyboard'
import TypingTestConfig from '@/components/TypingTestConfig'
import TextArea from '@/components/TextArea'
import { useSettings } from "@/context/SettingContext";
import { motion } from "framer-motion";

const page = () => {
  const { shakeActive } = useSettings();

  return (
    <motion.main
      className='flex flex-col gap-2 w-full relative'
      animate={
        shakeActive
          ? { x: [-10, 10, -8, 8, -5, 5, 0], y: [-2, 2, -1, 1, 0, 0, 0] }
          : { x: 0, y: 0 }
      }
      transition={{ duration: 0.4 , ease: "backInOut" }}
    >
      <Header />
      <SettingsPanel />      
      <TypingTestConfig/>
      <TextArea />
      <KeyboardComponent />
    </motion.main>
  )
}

export default page