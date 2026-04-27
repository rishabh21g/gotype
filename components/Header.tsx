"use client"

import React from "react"
import { motion } from "framer-motion"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

export default function Header() {
  // Use Shadcn's sidebar hook to control the opened/closed state
  const { toggleSidebar } = useSidebar()

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-6 w-full max-w-6xl mx-auto"
    >
      {/* Animated Brand / Logo */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer select-none"
      >
        <h1 className="text-3xl font-bold tracking-tighter text-primary">
          Go<span className="text-foreground">Type</span>
        </h1>
      </motion.div>

      {/* Animated Settings Trigger */}
      <motion.div
         whileHover={{ rotate: 90 }}
         whileTap={{ scale: 0.9 }}
         transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
        >
          <Settings className="h-6 w-6" />
          <span className="sr-only">Toggle Settings Sidebar</span>
        </Button>
      </motion.div>
    </motion.header>
  )
}