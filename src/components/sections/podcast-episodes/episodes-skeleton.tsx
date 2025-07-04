import { Skeleton } from "@/components/ui/skeleton";

export function EpisodesSkeleton() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Skeleton className="h-8 w-64 bg-gray-800" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-20 bg-gray-800" />
              ))}
            </div>
            <div className="flex items-center gap-1 bg-gray-800 p-1 rounded-lg">
              <Skeleton className="h-8 w-8 bg-gray-700" />
              <Skeleton className="h-8 w-8 bg-gray-700" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-xl bg-gray-800" />
              <Skeleton className="h-4 w-3/4 bg-gray-800" />
              <Skeleton className="h-4 w-1/2 bg-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
