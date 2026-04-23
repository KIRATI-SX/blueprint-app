import Button from "@/components/common/Button"

import { ArticleSectionView } from "./components/ArticleSectionView"
import { useArticleFilter } from "./hooks/useArticleFilter"

export default function ArticleSection() {
  const [activeFilter, setActiveFilter] = useArticleFilter()

  return (
    <section
      aria-label="Article section"
      className="flex w-full flex-col items-center gap-20"
    >
      <ArticleSectionView
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <Button variant="text" className="mb-10 h-10 w-fit">
        View more
      </Button>
    </section>
  )
}
