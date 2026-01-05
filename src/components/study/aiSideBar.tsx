import AIInteractionSection from "@/components/study/aiInteractionSection";
import ChatHistory from "./chatHistory";
import ChatInputSection from "./chatInputSection";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Play } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { sendVoiceToAI } from "@/lib/sendVoiceToAI";
import { startSpeechGeneration } from "@/lib/startSpeechGeneration";
import type { CourseContent } from "@/types/types";
import { set } from "zod/v4";

const SAMPLE_QUESTIONS = [
  "عرف المصطلحات الرئيسية للدرس",
  "انشئ ملخصًا للموضوع",
  "ما العلاقة بباقي مواضيع الدرس؟",
];

export function AISideBar({
  onClose,
  audioRef,
  sessionStarted,
  setSessionStarted,
  chapterFile,
}: {
  onClose: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  sessionStarted: boolean;
  setSessionStarted: React.Dispatch<React.SetStateAction<boolean>>;
  chapterFile: CourseContent;
}) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [previousQuestionsAudio, setPreviousQuestionsAudio] = useState<
    HTMLAudioElement[]
  >([]);
  const { messages, status, stop, sendMessage, error } = useChat();

  const handelTextMessage = (textInput: string) => {
    try {
      setLoading(true);
      audioRef.current?.pause();
      sendMessage({ text: textInput });
      setInput("");
      if (error) {
        throw new Error("Error sending message to LLM: " + error.message);
      }
    } catch (error) {
      console.error("Error sending text message:", error);
      setLoading(false);
    }
  };

  const handleVoiceMessage = async (file: string) => {
    // AI request
    try {
      setLoading(true);
      let { data } = await sendVoiceToAI(file);
      sendMessage({ text: data.text });
      if (error) {
        throw new Error("Error sending message to LLM: " + error.message);
      }
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setLoading(false);
    }
  };

  // Start session logic
  const startSession = (data: string) => {
    handelTextMessage(data);
    setSessionStarted(true);
  };

  // Previous questions replay handler
  const handleReplay = (messageIndex: number) => {
    audioRef.current?.pause();
    // Check chat history component for indexing logic
    audioRef.current =
      previousQuestionsAudio[
        messageIndex > 0 ? Math.ceil(messageIndex / 2) : 0
      ];
    audioRef.current?.load();
    audioRef.current?.play();
  };

  // Generating speech when AI response is ready
  useEffect(() => {
    if (status === "ready") {
      let text = messages[messages.length - 1]?.parts
        .map((part) => (part.type === "text" ? part.text : ""))
        .join("");
      if (text && text.length > 0) {
        startSpeechGeneration(text).then((audioUrl) => {
          setPreviousQuestionsAudio((prev) => [...prev, audioUrl]);
          audioRef.current = audioUrl;
          setLoading(false);
        });
      }
    }
  }, [status]);

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

      {/* Ready made questions */}
      <div className="p-4 border-b border-[#1d5479]">
        <div className="space-y-2">
          {SAMPLE_QUESTIONS.map((question) => (
            <button
              key={question}
              onClick={() =>
                startSession(
                  "This is the file content of the chapter. Answer my questions based on this content." +
                    JSON.stringify(chapterFile) +
                    "And Start by answering this question " +
                    question
                )
              }
              className="w-full text-right px-3 py-2 text-sm bg-[#1d5479] hover:bg-[#2a7ca8] text-[#fffdfd] rounded-md transition-colors"
            >
              {question}
            </button>
          ))}
        </div>

        {/* AI voice response controller area */}
        <div className="mt-4 pt-4 border-t border-[#1d5479] space-y-3">
          {sessionStarted ? (
            <AIInteractionSection
              loading={loading}
              handleVoiceMessage={handleVoiceMessage}
              audioRef={audioRef}
            />
          ) : (
            <Button
              onClick={() =>
                startSession(
                  "This is the file content of the chapter. Answer my questions based on this content." +
                    JSON.stringify(chapterFile)
                )
              }
              className="flex-1 h-9 w-full rounded-lg bg-[#ffa02f] hover:bg-[#ff8c1a] text-[#0e293c] flex items-center justify-center gap-2"
            >
              <span className="text-xs font-medium">ابدا شرح المفهوم</span>
              <Play className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Chat History Area */}
      <ChatHistory messages={messages} handleReply={handleReplay} />

      {/* Input Section */}
      {sessionStarted && (
        <ChatInputSection
          handleTextMessage={() => handelTextMessage(input)}
          input={input}
          setInput={setInput}
          status={status}
          stop={stop}
        />
      )}
    </div>
  );
}
