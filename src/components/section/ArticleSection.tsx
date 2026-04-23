import { ArticleSectionView } from "./article/ArticleSectionView"
import { MOCK_BLOG_POSTS } from "./article/mocks/blogPosts"
import { useArticleFilter } from "./article/useArticleFilter"

export default function ArticleSection() {
  const [activeFilter, setActiveFilter] = useArticleFilter()

  return (
    <ArticleSectionView
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      posts={MOCK_BLOG_POSTS}
    />
  )
}
