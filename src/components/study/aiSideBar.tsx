import { useState, useEffect, useCallback } from "react";
import { CarouselApi } from "../ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  X,
  Minimize2,
  Volume2,
  VolumeX,
  Play,
} from "lucide-react";
import { LiveKitRoom } from "@livekit/components-react";
import AgentController from "./agentController";

type AIuiState = "idle" | "started";

export function AISideBar({
  onClose,
  isOpen,
  api,
  numPages,
}: {
  isOpen: boolean;
  onClose: () => void;
  api: CarouselApi | null;
  numPages: number;
}) {
  const [uiState, setUiState] = useState<AIuiState>("idle");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Fetch token and manage LiveKit connection here
  const getToken = useCallback(async () => {
    try {
      console.log("run");
      const response = await fetch(`/api/get-lk-token`);
      const token = await response.text();
      setToken(token);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!isOpen) return null;

  const handleMicToggle = () => {
    if (uiState === "idle") {
      setUiState("started");
      getToken();
    } else if (uiState === "started") {
      setUiState("idle");
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0f4c6f]">
      {/* Header */}
      <div className="flex items-center justify-between py-2 px-4 border-b border-[#1d5479]">
        <h2 className="text-lg font-semibold text-[#fffdfd]">اهلا بك مع سند</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full hover:bg-[#1d5479]"
        >
          <X className="h-4 w-4 text-[#fffdfd]" />
        </Button>
      </div>

      {/* Interaction section Section */}

      {/* AI controls */}
      <div className="p-4 border-b border-[#1d5479]">
        <div className="w-full h-full rounded-2xl flex flex-col overflow-hidden backdrop-blur-sm">
          {token && uiState === "started" ? (
            <LiveKitRoom
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL!}
              token={token!}
              connect={true}
              video={false}
              audio={true}
              onDisconnected={() => {
                handleMicToggle();
              }}
              className="flex flex-col"
            >
              <AgentController api={api} numPages={numPages} />
            </LiveKitRoom>
          ) : (
            <div className="p-4 border-t border-[#1d5479]/50 flex items-center justify-center gap-3 h-full">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="h-10 w-10 rounded-full hover:bg-[#1d5479]"
              >
                {isMuted ? (
                  <VolumeX className="h-15 w-15 text-[#fffdfd]" />
                ) : (
                  <Volume2 className="h-15 w-15 text-[#fffdfd]" />
                )}
              </Button>
              {/* Main Mic Button */}
              <button
                onClick={handleMicToggle}
                className={`relative h-18 w-18 rounded-full flex items-center justify-center transition-all ${
                  uiState === "started"
                    ? "bg-red-500 hover:bg-red-600 scale-110"
                    : "bg-[#ffa02f] hover:bg-[#ff8c1a]"
                } shadow-lg`}
              >
                {uiState === "started" ? (
                  <MicOff className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-[#0e293c]" />
                )}
                {uiState === "started" && (
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                )}
              </button>
              <div className="h-10 w-10" /> {/* Spacer for symmetry */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
