import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function BlogLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
            <div className="flex items-center max-w-md mx-auto">
              <Skeleton className="h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post Skeleton */}
      <section className="py-16">
        <div className="container">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Skeleton className="aspect-[16/9] rounded-2xl" />
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-24 w-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-12 w-40 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Grid Skeleton */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[16/9]" />
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section Skeleton */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-8" />
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Skeleton className="h-12 w-full rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 