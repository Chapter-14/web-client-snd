"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

function CompletionCircle({
  current,
  total,
}: {
  current: number | null;
  total: number | null;
}) {
  const radius = 14;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const progress =
    current !== null && total !== null && total > 0 ? current / total : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      className="shrink-0"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth={stroke}
      />
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="#ffa02f"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-500 ease-out"
      />
    </svg>
  );
}

export function TopNav({
  topicName,
  chapterTitle,
  totalSections,
  currentSectionIndex,
  isConnected,
  onTopicTitleClick,
}: {
  topicName: string | null;
  chapterTitle: string | null;
  totalSections: number | null;
  currentSectionIndex: number | null;
  isConnected: boolean;
  onTopicTitleClick: () => void;
}) {
  const displayText = topicName || chapterTitle || "سند";

  return (
    <nav className="flex items-center justify-between w-full h-16 px-6 border-b border-[#1d5479]">
      {isConnected && topicName ? (
        <button
          onClick={onTopicTitleClick}
          className="group text-xl font-bold flex items-center gap-2 rounded-lg px-2 py-1 -ml-2 transition-colors hover:bg-white/5"
        >
          <span className="border-b border-transparent group-hover:border-[#ffa02f] transition-all duration-200">
            {displayText}
          </span>
          {(totalSections !== null || currentSectionIndex !== null) && (
            <CompletionCircle
              current={currentSectionIndex}
              total={totalSections}
            />
          )}
          <ChevronDown className="h-4 w-4 text-white/40 group-hover:text-[#ffa02f] transition-colors" />
        </button>
      ) : (
        <Link
          href="/my-library"
          className="text-xl font-bold flex items-center gap-2.5"
        >
          {displayText}
          {(totalSections !== null || currentSectionIndex !== null) && (
            <CompletionCircle
              current={currentSectionIndex}
              total={totalSections}
            />
          )}
        </Link>
      )}
      <div className="flex items-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/my-library">المكتبة</Link>
        </Button>
        <Button asChild>
          <Link href="/stats">الإحصائيات</Link>
        </Button>
      </div>
    </nav>
  );
}
