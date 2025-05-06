import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-1 p-6">
      <div className="space-y-2 mb-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>

      <Skeleton className="h-[100px] w-full mb-6" />

      <Skeleton className="h-[500px] w-full" />
    </div>
  )
}

