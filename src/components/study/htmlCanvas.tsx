import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { CourseContent } from "@/types/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect } from "react";

export function HtmlCanvas({ pdfUrl }: { pdfUrl: string | null }) {
  useEffect(() => {
    console.log("PDF URL:", pdfUrl);
  }, []);
  return (
    <Carousel className="h-fit overflow-y-scroll p-4 bg-[#0e293c]" dir="ltr">
      <CarouselContent>
        {Array.from({ length: file[0]["page_number"] }).map((_, index) => (
          <CarouselItem
            key={index}
            className="h-[90vh] rounded-lg overflow-clip "
          >
            <AspectRatio ratio={16 / 10} className="bg-white ">
              <div className="mx-auto bg-white shadow-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      file[0]["page_content_chunks"][index]["html_content"],
                  }}
                />
              </div>
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
