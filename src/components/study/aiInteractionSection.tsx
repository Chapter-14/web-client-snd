import { Button } from "@/components/ui/button";
import { Play, Pause, Mic } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { recordAudio } from "@/lib/recordAudio";
import AudioPlayerLoading from "./loadings/audioPlayerLoading";
import AudioRecorder from "@/components/study/audioRecorder";

export default function AIInteractionSection({
  handleVoiceMessage,
  loading,
  audioRef,
}: {
  handleVoiceMessage: (text: string) => void;
  loading: boolean;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPlay, setAudioPlay] = useState<boolean>(false);

  const [playbackProgress, setPlaybackProgress] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const readyToSendRef = useRef(false);

  // Recording functions handlers

  const startRecording = async () => {
    try {
      setIsRecording(true);
      audioRef.current?.pause();
      await recordAudio(
        streamRef,
        mediaRecorderRef,
        audioChunksRef,
        readyToSendRef,
        handleVoiceMessage
      );
    } catch (error) {
      console.error("Error recording audio:", error);
      alert("حدث خطا: " + (error as Error).message);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  const sendVoiceQuestion = () => {
    // Output of the recording is sent through this flag
    readyToSendRef.current = true;
    stopRecording();
  };

  const togglePlayPause = () => {
    if (!audioPlay) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  };

  // Audio controls

  // updating progress bar
  audioRef.current?.addEventListener("timeupdate", () => {
    setPlaybackProgress(
      audioRef.current
        ? (audioRef.current.currentTime / audioRef.current.duration) * 100
        : 0
    );
  });

  // when replay finishes
  audioRef.current?.addEventListener("ended", () => {
    setAudioPlay(false);
  });

  // Change player state when play/pause

  audioRef.current?.addEventListener("play", () => {
    setAudioPlay(true);
  });

  audioRef.current?.addEventListener("pause", () => {
    setAudioPlay(false);
  });

  // When a new answer message with audio is added, this is the input of the component
  useEffect(() => {
    if (audioRef.current !== null) {
      audioRef.current.play();
    }
  }, [audioRef.current]);

  return (
    <>
      {loading ? (
        <AudioPlayerLoading />
      ) : (
        <>
          {!isRecording ? (
            <>
              <div className="flex items-center gap-2">
                <Button
                  onClick={startRecording}
                  className="flex-1 h-9 rounded-lg bg-[#ffa02f] hover:bg-[#ff8c1a] text-[#0e293c] flex items-center justify-center gap-2"
                >
                  <span className="text-xs font-medium">اسأل</span>
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  onClick={togglePlayPause}
                  className="flex-1 h-9 rounded-lg bg-[#1d5479] hover:bg-[#2a7ca8] text-[#fffdfd] flex items-center justify-center gap-2"
                >
                  {audioPlay ? (
                    <>
                      <span className="text-xs font-medium">اوقف الشرح</span>
                      <Pause className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-medium">اكمل الشرح</span>
                      <Play className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-[#1d5479] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#ffa02f] h-full transition-all duration-400"
                    style={{
                      width: `${playbackProgress}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-[#e6e2e2]">مدة الشرح </span>
                  <span className="text-xs text-[#e6e2e2] font-medium">
                    {`${String(
                      Math.floor((audioRef.current?.duration || 0) / 60)
                    ).padStart(2, "0")}:${String(
                      Math.floor((audioRef.current?.duration || 0) % 60)
                    ).padStart(2, "0")}`}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <AudioRecorder
              sendVoiceQuestion={sendVoiceQuestion}
              cancelRecording={stopRecording}
            />
          )}
        </>
      )}
    </>
  );
}
