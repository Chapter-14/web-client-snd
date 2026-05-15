import { Topic, TopicState } from "@/types/types";
import { CheckSquare, Square } from "lucide-react";

const TOPIC_STATE_STYLES: Record<TopicState, string> = {
  not_started:
    "backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20",
  current:
    "backdrop-blur-sm bg-[#ffa02f]/10 border border-[#ffa02f]/40 hover:border-[#ffa02f]/60 shadow-[0_0_12px_rgba(255,160,47,0.15)]",
  done: "backdrop-blur-sm bg-green-500/10 border border-green-500/30",
};

export function TopicsModal({
  topics,
  topicStates,
  currentTopicName,
  onTopicSelect,
  handleTopicClick,
  onClose,
}: {
  topics: Topic[];
  topicStates: Record<string, TopicState>;
  currentTopicName: string | null;
  onTopicSelect: (topicSlug: string) => void;
  handleTopicClick: (topicSlug: string) => void;
  onClose?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md mx-4 bg-[#0a1f2e]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl max-h-[80vh] flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-sm font-medium text-[#ffa02f]">
            اختر موضوعاً للبدء
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-white/40 hover:text-white/80 transition-colors text-sm"
            >
              ✕
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {topics.length > 0 ? (
            topics.map((topic) => {
              const topicState: TopicState =
                topic.slug === currentTopicName
                  ? "current"
                  : topicStates[topic.slug] || "not_started";
              return (
                <button
                  key={topic.slug}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left transition-all duration-200 ${TOPIC_STATE_STYLES[topicState]} disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => handleTopicClick(topic.slug)}
                  disabled={topicState === "current" || topicState === "done"}
                >
                  <div className="relative shrink-0">
                    {topicState === "done" ? (
                      <CheckSquare className="h-4 w-4 text-green-400" />
                    ) : (
                      <Square className="h-4 w-4 text-white/40" />
                    )}
                  </div>
                  <span className="text-sm text-[#fffdfd] truncate">
                    {topic.name}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-xs text-white/40">لا توجد مواضيع</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
