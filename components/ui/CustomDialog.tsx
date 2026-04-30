"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CaseSensitive } from 'lucide-react'
function CustomWordsDialog({
  open,
  onOpenChange,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  onConfirm: (val: string) => void
}) {
  const [val, setVal] = useState('')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs rounded-2xl border-border/60 bg-background shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold tracking-wide flex items-center gap-2">
            <CaseSensitive className="w-4 h-4 text-primary" /> Custom Word Count
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Enter a word count (10 – 500).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-1">
          <Label htmlFor="custom-words" className="text-xs text-muted-foreground">Words</Label>
          <Input
            id="custom-words"
            type="number"
            min={10}
            max={500}
            placeholder="e.g. 150"
            value={val}
            onChange={(e) => setVal(e.target.value)}
            className="h-9 text-sm rounded-lg border-border/60 focus-visible:ring-primary/40"
          />
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="text-xs rounded-lg">
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={!val || isNaN(Number(val)) || Number(val) < 10}
            onClick={() => { onConfirm(val); onOpenChange(false) }}
            className="text-xs rounded-lg"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default CustomWordsDialog