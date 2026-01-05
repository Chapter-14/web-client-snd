import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseLoading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-2">
      <div className="space-y-2">
        <Skeleton className="h-2 w-32" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="relative justify-between">
            <CardHeader>
              <div className="flex items-start justify-between relative">
                <div className="space-y-3 w-full">
                  {/* Image skeleton */}
                  <Skeleton className="w-full h-64 rounded-md bg-background" />

                  {/* Title skeleton */}
                  <Skeleton className="h-4 w-3/4" />

                  {/* Description skeleton */}
                  <div className="space-y-2">
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-2 w-5/6" />
                  </div>
                </div>

                {/* Badge skeleton */}
                <Skeleton className="h-6 w-12 absolute top-2 left-2" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
