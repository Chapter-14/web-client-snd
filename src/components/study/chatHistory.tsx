import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UIMessage } from "ai";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChatHistory({
  messages,
  handleReply,
}: {
  messages: UIMessage[];
  handleReply: (messageIndex: number) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
      {/* Welcome Message */}
      <div className={`flex justify-end`}>
        <div className={`max-w-xs space-y-2`}>
          <div
            className={`px-4 py-2 rounded-lg text-sm  bg-[#1d5479] text-[#fffdfd] rounded-bl-none line-clamp-30`}
          >
            <span>
              يا هلا حياك الله! انا سند مدرسك الخصوصي المدعوم بالذكاء الاصطناعي،
              كيف يمكنني مساعدتك اليوم ؟ هل تريد ان ابدأ مباشرة في شرح المفهوم ؟
            </span>
          </div>
        </div>
      </div>
      {/* First User Message */}
      {messages.length > 0 && (
        <div className="flex justify-start">
          <div className={`max-w-xs`}>
            <div
              className={`px-4 py-2 rounded-lg text-sm bg-[#ffa02f] text-[#0e293c] rounded-br-none font-medium`}
            >
              <span>ابدا شرح المفهوم</span>
            </div>
          </div>
        </div>
      )}
      {/* Subsequent Messages */}
      {messages.length > 1
        ? messages.slice(1).map((message, index) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs ${
                  message.role === "user" ? "" : "space-y-2"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-[#ffa02f] text-[#0e293c] rounded-br-none font-medium"
                      : "bg-[#1d5479] text-[#fffdfd] rounded-bl-none line-clamp-30"
                  }`}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      if (part.text === "") {
                        return (
                          <LoadingSkeleton key={`${message.id}-${index}`} />
                        );
                      } else {
                        return (
                          <span key={`${message.id}-${index}`}>
                            {part.text}
                          </span>
                        );
                      }
                    }
                  })}
                </div>
                {message.role === "assistant" && (
                  <Button
                    onClick={() => handleReply(index)}
                    variant="ghost"
                    size="sm"
                    className="h-7 px-3 text-xs bg-[#1d5479] hover:bg-[#2a7ca8] text-[#fffdfd] flex items-center gap-1.5 replay mr-auto"
                  >
                    <RotateCcw className="h-3 w-3" />
                    اعد الشرح
                  </Button>
                )}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <>
      <Skeleton className="h-6 w-4 mb-1 rounded-full animate-bounce" />
    </>
  );
}
