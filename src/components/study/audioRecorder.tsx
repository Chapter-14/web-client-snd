import { Button } from "@/components/ui/button";
import { Send, MicOff } from "lucide-react";

export default function AudioRecorder({
  sendVoiceQuestion,
  cancelRecording,
}: {
  sendVoiceQuestion: () => void;
  cancelRecording: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 justify-center py-2 px-4 bg-[#1d5479] rounded-lg">
        <div className="h-2 w-2 bg-[#ffa02f] rounded-full animate-pulse" />
        <span className="text-xs text-[#fffdfd] font-medium">
          تسجيل سؤالك الصوتي...
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          onClick={sendVoiceQuestion}
          className="flex-1 h-9 rounded-lg bg-[#ffa02f] hover:bg-[#ff8c1a] text-[#0e293c] flex items-center justify-center gap-2"
        >
          <span className="text-xs font-medium">إرسال</span>
          <Send className="h-4 w-4" />
        </Button>
        <Button
          onClick={cancelRecording}
          className="flex-1 h-9 rounded-lg bg-[#1d5479] hover:bg-[#2a7ca8] text-[#fffdfd] flex items-center justify-center gap-2"
        >
          <span className="text-xs font-medium">إلغاء</span>
          <MicOff className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
