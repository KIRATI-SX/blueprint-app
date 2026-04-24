import { Skeleton } from "@/components/ui/skeleton"

const SKELETON_CARDS = 6

/**
 * โครงเดียวกับ BlogCard: รูป 16/10, badge, บรรทัดข้อความ, แถวอวตาร+วันที่
 */
function BlogCardSkeleton() {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm"
      aria-hidden
    >
      <div className="relative aspect-[16/10] w-full shrink-0">
        <Skeleton className="size-full min-h-0 rounded-none" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <Skeleton className="h-7 w-24 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-[90%] max-w-md" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="mt-auto flex items-center gap-3 border-t border-brown-200 pt-4">
          <Skeleton className="size-8 shrink-0 rounded-full" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </article>
  )
}

type ArticlePostListSkeletonProps = Readonly<{
  /** จำนวนการ์ด placeholder (default 6 = หน้าแรก) */
  count?: number
}>

/**
 * สเกเลตันตอนกำลังโหลดรายการ — จัด grid ให้ตรง `BlogCard`
 */
export function ArticlePostListSkeleton({ count = SKELETON_CARDS }: ArticlePostListSkeletonProps) {
  return (
    <ul
      className="m-0 grid list-none grid-cols-1 gap-6 p-0 lg:grid-cols-2"
      aria-busy
      aria-label="Loading articles"
    >
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="min-w-0">
          <BlogCardSkeleton />
        </li>
      ))}
    </ul>
  )
}
