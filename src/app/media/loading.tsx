import { Skeleton } from "@/components/ui/skeleton";

export default function MediaLoading() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Skeleton */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-secondary/5 overflow-hidden">
                <div className="container px-4 text-center">
                    <Skeleton className="h-6 w-32 mx-auto mb-4 rounded-full" />
                    <Skeleton className="h-16 w-3/4 md:w-1/2 mx-auto mb-6" />
                    <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
            </section>

            {/* Gallery Skeleton */}
            <section className="py-20 container px-4 mx-auto">
                <Skeleton className="h-10 w-48 mx-auto mb-10" />
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="w-full aspect-[3/4] rounded-2xl" />
                    ))}
                </div>
            </section>
        </div>
    );
}
