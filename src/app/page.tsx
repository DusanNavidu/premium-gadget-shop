import { HeroBanner } from "@/components/landing/hero-banner";
import { CategoryShowcase } from "@/components/landing/category-showcase";
import { FeaturedProducts } from "@/components/landing/featured-products";
import { TechHighlights } from "@/components/landing/tech-highlights";
import { SiteFooter } from "@/components/layout/site-footer";
import { FlashDeals } from "@/components/landing/flash-deals";

export default function HomePage() {
  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      <main>
        <HeroBanner />
        <FlashDeals />
        <FeaturedProducts />
        <TechHighlights />
      </main>
      <div className="-mb-28">
        <SiteFooter />
      </div>
    </div>
  );
}