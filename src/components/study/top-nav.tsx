"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function TopNav({ topicName }: { topicName: string }) {
  return (
    <nav className="flex items-center justify-between w-full h-16 px-6 border-b border-[#1d5479]">
      <Link href="/study" className="text-xl font-bold">
        {topicName}
      </Link>
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
