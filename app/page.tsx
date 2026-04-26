import React from 'react'
import MacKeyboard from "@/components/MacKeyboard"
const page = () => {
  return (
    <MacKeyboard
      showDisplay={true}
      onKeyPress
      listenToPhysicalKeys={true}
    />
  )
}

export default page