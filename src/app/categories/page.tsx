import { CategoryExplorer } from "@/components/categories/category-explorer";

export default function CategoryPage() {
  return (
    <div className="min-h-screen pt-24 pb-28 md:pb-16 px-4 md:px-6 container mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-2">
          Categories
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Find exactly what you're looking for by browsing our collections.
        </p>
      </div>

      <CategoryExplorer />
    </div>
  );
}