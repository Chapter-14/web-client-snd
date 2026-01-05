"use client";

import { useState, useRef, use, useEffect } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import ch4Content from "@/assets/course-1/ch4.json";
import type { CourseContent } from "@/types/types";
// import { FloatingToolsMenu } from "@/components/floating-tools-menu";
import { AISideBar } from "@/components/study/aiSideBar";
import { TopNav } from "@/components/study/top-nav";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import { Database } from "@/types/database.types";

type Chapter = Database["public"]["Tables"]["chapters"]["Row"];

export default function Study() {
  const { chapter } = useParams();
  const chapterId = Array.isArray(chapter) ? chapter[0] : chapter || "";
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const supabase = useDatabase();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    if (sidebarOpen) {
      audioRef.current?.pause();
    } else if (!sessionStarted) {
      audioRef.current?.load();
      audioRef.current?.play();
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    audioRef.current?.pause();
  };

  useEffect(() => {
    // Create the Audio instance only once
    audioRef.current = new Audio("/audio/welcome_message_v2.mp3");

    // Fetch chapter material
    async function fetchChapterMaterial() {
      const { data: chapter, error }: { data: Chapter | null; error: any } =
        await supabase
          .from("chapters")
          .select("pdf_url, json_url")
          .eq("id", parseInt(chapterId, 10))
          .single();

      if (error) {
        console.error("Error fetching courses:", error);
        return { pdf_url: null, json_url: null };
      }

      setPdfUrl(chapter?.pdf_url || null);
    }

    if (chapterId) {
      fetchChapterMaterial();
    }

    // Cleanup function
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [chapterId]);

  return (
    <>
      <TopNav onAIToggle={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex overflow-x-hidden bg-background pt-16">
        <div
          className={`relative right-0 top-0 h-[calc(100vh-4rem)] bg-card transition-transform duration-300 ease-in-out z-50 xl:w-100 lg:w-75 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
          style={{
            display: sidebarOpen ? "block" : "none",
          }}
        >
          <AISideBar
            onClose={closeSidebar}
            audioRef={audioRef}
            sessionStarted={sessionStarted}
            setSessionStarted={setSessionStarted}
            chapterFile={ch4Content as CourseContent}
          />
        </div>

        {/* Main Canvas - shrinks when sidebar opens on desktop */}
        <div className="flex-1 transition-all duration-300 relative">
          <PdfCanvas pdfUrl={pdfUrl} />
          {/* <FloatingToolsMenu /> */}
        </div>

        {/* {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden top-16"
            onClick={() => setSidebarOpen(false)}
          />
        )} */}
      </div>
    </>
  );
}
