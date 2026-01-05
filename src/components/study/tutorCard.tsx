import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, X, Minimize2, Volume2, VolumeX } from "lucide-react";

interface VoiceAIWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

type AIState = "idle" | "listening" | "thinking" | "speaking";

export function VoiceAIWidget({ isOpen, onClose }: VoiceAIWidgetProps) {
  const [state, setState] = useState<AIState>("idle");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const [waveformBars] = useState(
    Array.from({ length: 20 }, () => Math.random())
  );

  useEffect(() => {
    // Simulate state transitions for demo
    if (state === "listening") {
      const timer = setTimeout(() => {
        setTranscript("Can you explain the key concepts from page 2?");
        setState("thinking");
      }, 3000);
      return () => clearTimeout(timer);
    } else if (state === "thinking") {
      const timer = setTimeout(() => {
        setResponse(
          "Based on page 2, the key concepts revolve around internet protocols..."
        );
        setState("speaking");
      }, 2000);
      return () => clearTimeout(timer);
    } else if (state === "speaking") {
      const timer = setTimeout(() => {
        setState("idle");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  if (!isOpen) return null;

  const handleMicToggle = () => {
    if (state === "idle") {
      setState("listening");
      setTranscript("");
      setResponse("");
    } else if (state === "listening") {
      setState("idle");
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isMinimized ? "w-16 h-16" : "w-80 h-96"
      }`}
    >
      {/* Minimized State */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-full h-full rounded-full bg-gradient-to-br from-[#1d5479] to-[#0e293c] shadow-2xl flex items-center justify-center hover:scale-105 transition-transform border-2 border-[#ffa02f]"
        >
          <div className={`${state === "speaking" ? "animate-pulse" : ""}`}>
            <Mic className="h-6 w-6 text-[#ffa02f]" />
          </div>
        </button>
      ) : (
        // Expanded State
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#0e293c] to-[#1d5479] shadow-2xl border border-[#1d5479] flex flex-col overflow-hidden backdrop-blur-sm">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1d5479]/50">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(true)}
                className="h-7 w-7 hover:bg-[#1d5479]"
              >
                <Minimize2 className="h-3 w-3 text-[#fffdfd]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-7 w-7 hover:bg-[#1d5479]"
              >
                <X className="h-3 w-3 text-[#fffdfd]" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#fffdfd]">
                {state === "listening"
                  ? "Listening..."
                  : state === "thinking"
                  ? "Thinking..."
                  : state === "speaking"
                  ? "Speaking..."
                  : "AI Tutor"}
              </span>
              <div
                className={`w-2 h-2 rounded-full ${
                  state === "listening"
                    ? "bg-red-500 animate-pulse"
                    : state === "thinking"
                    ? "bg-yellow-500 animate-pulse"
                    : state === "speaking"
                    ? "bg-green-500 animate-pulse"
                    : "bg-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Waveform Visualization */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="flex items-center justify-center gap-1 h-32 w-full">
              {waveformBars.map((height, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-t from-[#ffa02f] to-[#ff8c1a] rounded-full transition-all duration-150 ${
                    state === "speaking" ? "animate-pulse" : ""
                  }`}
                  style={{
                    width: "4px",
                    height:
                      state === "speaking"
                        ? `${30 + Math.random() * 70}%`
                        : `${height * 40 + 10}%`,
                    opacity: state === "idle" ? 0.3 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-[#1d5479]/50 flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="h-10 w-10 rounded-full hover:bg-[#1d5479]"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-[#fffdfd]" />
              ) : (
                <Volume2 className="h-5 w-5 text-[#fffdfd]" />
              )}
            </Button>
            {/* Main Mic Button */}
            <button
              onClick={handleMicToggle}
              disabled={state === "thinking" || state === "speaking"}
              className={`relative h-14 w-14 rounded-full flex items-center justify-center transition-all ${
                state === "listening"
                  ? "bg-red-500 hover:bg-red-600 scale-110"
                  : "bg-[#ffa02f] hover:bg-[#ff8c1a]"
              } ${
                state === "thinking" || state === "speaking"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              } shadow-lg`}
            >
              {state === "listening" ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Mic className="h-6 w-6 text-[#0e293c]" />
              )}
              {state === "listening" && (
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
              )}
            </button>
            <div className="h-10 w-10" /> {/* Spacer for symmetry */}
          </div>
        </div>
      )}
    </div>
  );
}
