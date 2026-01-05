"use client";

import React from "react";

import { Menu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@/components/navigation-menu";
import Image from "next/image";

interface TopNavProps {
  onAIToggle: () => void;
  sidebarOpen: boolean;
}

export function TopNav({ onAIToggle, sidebarOpen }: TopNavProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0e293c] border-b border-primary z-40 flex items-center px-6">
        {/* Left Section: AI Button and Menu Button */}
        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          {/* Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-card hover:bg-primary/20"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          {/* Sanad Button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={onAIToggle}
            className={`h-10  ${
              sidebarOpen
                ? "bg-accent/20 text-accent hover:bg-accent/30"
                : "text-foreground hover:bg-primary/20 bg-accent"
            }`}
            title="Open AI assistant"
          >
            جرب سند <Zap className="h-5 w-5" />
          </Button>
        </div>

        {/* Right Section: Company Logo and Tabs */}
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Image
              width={32}
              height={32}
              src="/static/logo.png"
              alt="Company Logo"
            />
          </div>
        </div>
      </nav>

      <NavigationMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
