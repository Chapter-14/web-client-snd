"use client";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Play } from "lucide-react";
import Image from "next/image";
import type { LauncherState } from "@/types/types";

interface MenuPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  launcherState: LauncherState;
  onLogoClick: () => void;
  language: "English" | "Arabic";
  onLanguageChange: (lang: "English" | "Arabic") => void;
  onStart: () => void;
}

export function MenuPopup({
  open,
  onOpenChange,
  launcherState,
  onLogoClick,
  language,
  onLanguageChange,
  onStart,
}: MenuPopupProps) {
  const isActive = launcherState === "active";

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          onClick={onLogoClick}
          className="rounded-full shadow-lg transition-all duration-300 ease-out flex items-center justify-center ring-2 ring-accent/40 hover:ring-accent/70 group"
          style={{
            width: isActive ? "50px" : "56px",
            height: isActive ? "50px" : "56px",
            background: "linear-gradient(135deg, #0e293c 0%, #045687 100%)",
          }}
        >
          <Image
            src="/static/logo.png"
            alt="Logo"
            width="34"
            height="34"
            className="transition-all duration-300 ease-out"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="min-w-40 bg-primary/80 backdrop-blur-md rounded-md p-4 shadow-2xl ml-4"
      >
        <div className="space-y-2">
          <ToggleGroup
            type="single"
            value={language}
            onValueChange={(val) =>
              val && onLanguageChange(val as "English" | "Arabic")
            }
            variant="outline"
            className="w-full"
          >
            <ToggleGroupItem
              value="Arabic"
              className="text-xs flex-1 data-[state=on]:bg-[#ffa02f] data-[state=on]:text-white data-[state=on]:border-[#ffa02f]"
            >
              عربي
            </ToggleGroupItem>
            <ToggleGroupItem
              value="English"
              className="text-xs flex-1 data-[state=on]:bg-[#ffa02f] data-[state=on]:text-white data-[state=on]:border-[#ffa02f]"
            >
              English
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            onClick={onStart}
            className="gap-2 bg-[#ffa02f] hover:bg-[#ff8c1a] text-white rounded-lg w-full py-2 px-8"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>ابدأ الان</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
