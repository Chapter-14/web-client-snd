"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useDatabase } from "@/context/databaseContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseLoading from "@/components/library-dashboard/loadingCourseCards";
import TopNav from "@/components/landing/topNav";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { Database } from "@/types/database.types";

type Course = Database["public"]["Tables"]["courses"]["Row"];

export default function EnrollPage() {
  const supabase = useDatabase();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [enrollingCourseId, setEnrollingCourseId] = useState<number | null>(
    null
  );
  const { user } = useUser();

  useEffect(() => {
    const fetchCourses = async () => {
      if (!supabase) return;

      setLoading(true);
      const { data: courses, error } = await supabase.rpc(
        "get_unenrolled_courses",
        { check_user_id: user?.id || "" } as any
      );

      if (error) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        return;
      }
      setCourses(courses || []);
      setLoading(false);
    };
    fetchCourses();
  }, [supabase]);

  const handleEnroll = async (courseId: number) => {
    try {
      setEnrollingCourseId(courseId);

      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "فشل التسجيل في الدورة");
      }

      toast.success("تم التسجيل في الدورة بنجاح");
      router.push("/my-library");
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast.error(
        error instanceof Error ? error.message : "حدث خطأ أثناء التسجيل"
      );
    } finally {
      setEnrollingCourseId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-white to-[#e6e9ed] dark:from-[#0e293c] dark:via-[#1d5479] dark:to-[#0e293c]">
        <TopNav />
        <CourseLoading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f7fa] via-white to-[#e6e9ed] dark:from-[#0e293c] dark:via-[#1d5479] dark:to-[#0e293c]">
      <TopNav />

      <div className="container mx-auto px-4 sm:px-8 py-12">
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              استكشف الدورات المتاحة
            </h1>
            <p className="text-lg text-card/80">
              اختر من بين مجموعة واسعة من الدورات المتاحة وابدأ رحلتك التعليمية
              اليوم
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course: Course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow cursor-pointer relative justify-between"
            >
              <CardHeader>
                <div className="flex items-start justify-between relative">
                  <div className="space-y-1">
                    <Image
                      src={
                        course.img_url || "/static/course-card-placeholder.png"
                      }
                      alt="Chapter"
                      width={100}
                      height={40}
                      className="w-full rounded-t-lg"
                      loading="eager"
                    />
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </div>
                  <Badge
                    variant="default"
                    className="bg-accent/80 absolute top-2 left-2"
                  >
                    جديد
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.chapters} فصول</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} ساعة</span>
                  </div>
                </div>
              </CardContent>
              <CardContent className="px-6">
                <Button
                  onClick={() => handleEnroll(course.id)}
                  disabled={enrollingCourseId === course.id}
                  className="w-full bg-gradient-to-r from-[#1d5479] to-[#ffa02f] hover:from-[#0e293c] hover:to-[#ff8c00] text-white group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>
                    {enrollingCourseId === course.id
                      ? "جاري التسجيل..."
                      : "اشترك في الدورة"}
                  </span>
                  {enrollingCourseId !== course.id && (
                    <ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-lg text-card/80">
              لا توجد دورات متاحة حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
