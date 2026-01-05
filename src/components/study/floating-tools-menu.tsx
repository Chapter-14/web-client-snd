"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PenTool, Highlighter, Eraser, Plus, X } from "lucide-react"

interface FloatingToolsMenuProps {
  onToolSelect?: (tool: string) => void
}

export function FloatingToolsMenu({ onToolSelect }: FloatingToolsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const tools = [
    { id: "pen", label: "Pen", icon: PenTool },
    { id: "highlighter", label: "Highlighter", icon: Highlighter },
    { id: "eraser", label: "Eraser", icon: Eraser },
  ]

  return (
    <div className="fixed bottom-8 left-8 z-40">
      {isOpen && (
        <div className="absolute bottom-16 left-0 flex flex-col gap-2 bg-black/70 backdrop-blur-md rounded-lg p-3 shadow-lg border border-white/10 w-48">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Button
                key={tool.id}
                variant="ghost"
                className="w-full justify-start gap-2 text-white hover:bg-white/10"
                onClick={() => {
                  onToolSelect?.(tool.id)
                  setIsOpen(false)
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{tool.label}</span>
              </Button>
            )
          })}
        </div>
      )}

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg transition-all ${
          isOpen ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
      </Button>
    </div>
  )
}
