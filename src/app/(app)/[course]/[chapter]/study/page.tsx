"use client";

import { useState, useEffect, useCallback } from "react";
import { PdfCanvas } from "@/components/study/pdfCanvas";
import { useParams } from "next/navigation";
import { useDatabase } from "@/context/databaseContext";
import { Database, Json } from "@/types/database.types";
import { CarouselApi } from "@/components/ui/carousel";
import { markerPayload } from "@/types/types";
import { TopNav } from "@/components/study/top-nav";
import { StudyLauncher } from "@/components/study/study-launcher";

type Chapter = Database["public"]["Tables"]["chapters"]["Row"];

export default function Study() {
  const params = useParams<{
    course: string | string[];
    chapter: string | string[];
  }>();

  const courseSlug = Array.isArray(params.course)
    ? params.course[0]
    : params.course || "";
  const chapterIndex = parseInt(
    Array.isArray(params.chapter) ? params.chapter[0] : params.chapter || "1",
  );
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [chapterTitle, setChapterTitle] = useState<string | null>(null);

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [topicsJSON, setTopicsJSON] = useState<Json>({});

  const [activeMarker, setActiveMarker] = useState<
    Record<string, markerPayload>
  >({});

  const [currentTopicName, setCurrentTopicName] = useState<string | null>(null);
  const [totalSections, setTotalSections] = useState<number | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const supabase = useDatabase();

  useEffect(() => {
    async function fetchChapterPDF() {
      const { data: chapter, error }: { data: Chapter | null; error: any } =
        await supabase
          .from("chapters")
          .select(
            `
          *,
          courses!inner(slug)
        `,
          )
          .eq("courses.slug", courseSlug)
          .eq("order_index", chapterIndex)
          .single();

      if (error) {
        console.error("Error fetching courses:", error);
        return { pdf_url: null };
      }
      setPdfUrl(chapter?.pdf_url || null);
      setChapterTitle(chapter?.title || null);
    }

    async function fetchTopicsJSON() {
      try {
        const response = await fetch(
          `/api/fetch-bunny/courses/${courseSlug}/ch_${chapterIndex}/topics_list.json`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error);
        }

        setTopicsJSON(data);
      } catch (error) {
        console.error("Error fetching in course JSON:", error);
      }
    }

    if (chapterIndex) {
      fetchChapterPDF();
      fetchTopicsJSON();
    }
  }, [courseSlug, chapterIndex, supabase]);

  const handleTopicChange = useCallback(
    (topicName: string | null, sections: number | null, sectionIndex: number | null) => {
      setCurrentTopicName(topicName);
      setTotalSections(sections);
      setCurrentSectionIndex(sectionIndex);
    },
    [],
  );

  return (
    <>
      <div className="relative bg-background max-h-screen h-screen">
        <TopNav
          topicName={currentTopicName}
          chapterTitle={chapterTitle}
          totalSections={totalSections}
          currentSectionIndex={currentSectionIndex}
          isConnected={isConnected}
          onTopicTitleClick={() => setShowTopicsModal(true)}
        />
        <PdfCanvas
          pdfUrl={pdfUrl}
          api={api}
          setApi={setApi}
          numPages={numPages}
          setNumPages={setNumPages}
          activeMarker={activeMarker}
        />
        <StudyLauncher
          api={api}
          numPages={numPages}
          topicsJSON={topicsJSON}
          courseSlug={courseSlug}
          chapterIndex={chapterIndex}
          showTopicsModal={showTopicsModal}
          onShowTopicsModalChange={setShowTopicsModal}
          setActiveMarker={setActiveMarker}
          onTopicChange={handleTopicChange}
          onConnectedChange={setIsConnected}
        />
      </div>
    </>
  );
}
