import Header from '@/components/Header'
import { SettingsPanel } from '@/components/SettingsPanel'
import KeyboardComponent from '@/components/Keyboard'
import TypingTestConfig from '@/components/TypingTestConfig'
import TextArea from '@/components/TextArea'

const page = () => {

  return (
    <main className='flex flex-col gap-2 w-full relative'>
      <Header />
      <SettingsPanel />      
      <TypingTestConfig/>
      <TextArea />
      <KeyboardComponent />
    </main>
  )
}

export default page