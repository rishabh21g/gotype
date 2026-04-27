import React from 'react'
import { Button } from './ui/button'
import { RotateCw } from 'lucide-react'

const Control = () => {
  return (
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
  )
}

export default Control