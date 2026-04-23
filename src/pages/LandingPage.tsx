import NavBar from "../components/layout/NavBar";

import Footer from "../components/layout/Footer";
import HeroSection from "@/components/section/HeroSection";
import ArticleSection from "@/components/section/ArticleSection";

export default function LandingPage() {
  return (
    <main className="flex flex-col justify-between h-screen" >
        <NavBar />
        <HeroSection />
        <ArticleSection />
        <Footer />
    </main>
  );
}
