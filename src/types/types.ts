export interface PageContentChunk {
  id: string;
  type: "paragraph" | "equation" | string;
  html_content: string;
}

export interface CoursePage {
  page_number: number;
  page_content_chunks: PageContentChunk[];
}

export type CourseContent = CoursePage[];
