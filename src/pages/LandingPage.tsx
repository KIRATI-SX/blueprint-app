import BlogPageLayout from "@/components/layout/BlogPageLayout";
import HeroSection from "@/components/section/HeroSection";
import ArticleSection from "@/features/article/ArticleSection";

export default function LandingPage() {
  return (
    <BlogPageLayout mainClassName="flex flex-1 flex-col">
      <HeroSection />
      <ArticleSection />
    </BlogPageLayout>
  );
}
