import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pause, Send } from "lucide-react";

export default function ChatInputSection({
  handleTextMessage,
  input,
  setInput,
  status,
  stop,
}: {
  handleTextMessage: () => void;
  input: string;
  setInput: (value: string) => void;
  status: string;
  stop: () => void;
}) {
  return (
    <div className="py-2 px-4  border-t border-[#1d5479] space-y-3">
      <div className="flex gap-2">
        {status === "submitted" || status === "streaming" ? (
          <Button
            onClick={stop}
            size="icon"
            className="rounded-lg bg-red-500 hover:bg-red-600 text-[#0e293c]"
          >
            <Pause />
          </Button>
        ) : (
          <Button
            onClick={() => handleTextMessage()}
            size="icon"
            className="rounded-lg bg-[#ffa02f] hover:bg-[#ff8c1a] text-[#0e293c]"
            disabled={status !== "ready" || input.trim() === ""}
          >
            <Send />
          </Button>
        )}

        <Input
          className="text-sm bg-[#1d5479] text-[#fffdfd] placeholder:text-[#e6e2e2] border-[#1d5479] text-right"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اسألني عن الدرس..."
        />
      </div>
    </div>
  );
}
