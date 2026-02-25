import { useState, useCallback, useEffect } from "react";
import { CarouselApi } from "../ui/carousel";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";
import AgentController from "./agentController";
import { RoomContext } from "@livekit/components-react";
import { Room, RoomEvent, DisconnectReason } from "livekit-client";
import { set } from "zod/v4";

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
  const [token, setToken] = useState<string | null>(null);
  const [room] = useState(() => new Room({}));

  const toggleConnect = () => {
    if (uiState === "idle") {
      setUiState("started");
      getToken();
    } else if (uiState === "started") {
      setUiState("idle");
      setToken(null);
    }
  };

  useEffect(() => {
    if (!room || !token) return;

    // Attach listener
    room.on(RoomEvent.Disconnected, toggleConnect);

    // Connect to room
    const connectToRoom = async () => {
      try {
        if (room.state === "disconnected") {
          await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL!, token);
          await room.localParticipant.setAttributes({
            course_id: "ICS202",
            chapter_id: "chapter3",
            language: "Arabic",
            user_id: "user_123",
          });

          setUiState("started");
        }
      } catch (error) {
        console.error("Failed to connect:", error);
        setUiState("idle");
        setToken(null);
      }
    };

    connectToRoom();

    // Cleanup
    return () => {
      room.off(RoomEvent.Disconnected, toggleConnect);
    };
  }, [room, token]);

  // Disconnect when switching back to idle
  useEffect(() => {
    if (uiState === "idle") {
      room.disconnect();
    }
  }, [uiState, room]);

  // Fetch token and manage LiveKit connection here
  const getToken = useCallback(async () => {
    try {
      const response = await fetch(`/api/get-lk-token`);
      const token = await response.text();
      setToken(token);
    } catch (error) {
      setUiState("idle");
      console.error(error);
    }
  }, []);

  if (!isOpen) return null;

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

      {/* Voice Assistant Section */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {token && uiState === "started" ? (
          <RoomContext.Provider value={room}>
            <AgentController api={api} numPages={numPages} />
          </RoomContext.Provider>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="text-center mb-8 space-y-2">
              <h3 className="text-xl font-semibold text-[#fffdfd]">
                مستعد للمساعدة
              </h3>
              <p className="text-sm text-[#fffdfd]/70">
                انقر على زر التشغيل للبدء في المحادثة مع سند
              </p>
            </div>
            <div className="flex items-center justify-center gap-3">
              {/* Main Start Button */}
              <button
                onClick={toggleConnect}
                className="relative h-16 w-16 rounded-full flex items-center justify-center transition-all bg-[#ffa02f] hover:bg-[#ff8c1a] shadow-lg hover:scale-105"
              >
                <Play className="h-7 w-7 text-[#0e293c]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
