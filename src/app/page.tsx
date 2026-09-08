import { HeroBanner } from "@/components/landing/hero-banner";
import { CategoryShowcase } from "@/components/landing/category-showcase";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { TechHighlights } from "@/components/landing/tech-highlights";
import { SiteFooter } from "@/components/layout/site-footer";

export default function HomePage() {
  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      <main>
        <HeroBanner />
        <CategoryShowcase />
        <FeaturedProducts />
        <TechHighlights />
      </main>
      <SiteFooter />
    </div>
  );
}