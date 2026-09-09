import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { productMedia } from "@/data/product-media";
import { productVariants } from "@/data/product-variants";
import { productDetails } from "@/data/product-details";
import { shippingMethods } from "@/data/shipping-methods";
import { ProductDetailView } from "@/components/shop/single-product/product-detail-view";
import { FlashDealBanner } from "@/components/shop/flash-deal-banner";

export default async function FlashDealDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  // Only genuine flash-deal products get this page — anything else 404s,
  // so someone can't reach a non-sale item through /flash-deals/[id].
  if (!product || product.badge !== "Sale" || !product.originalPrice) {
    notFound();
  }

  const media = productMedia.find((m) => m.productId === id);
  const variants = productVariants.find((v) => v.productId === id);
  const details = productDetails.find((d) => d.productId === id);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6 container mx-auto max-w-7xl">
      <FlashDealBanner originalPrice={product.originalPrice} basePrice={product.basePrice} />

      <ProductDetailView
        product={product}
        media={media}
        variants={variants}
        details={details}
        shippingMethods={shippingMethods}
      />
    </div>
  );
}