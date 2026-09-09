import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { productMedia } from "@/data/product-media";
import { productVariants } from "@/data/product-variants";
import { productDetails } from "@/data/product-details";
import { shippingMethods } from "@/data/shipping-methods";
import { ProductDetailView } from "@/components/shop/single-product/product-detail-view";


export default async function SingleProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const product = products.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  const media = productMedia.find((m) => m.productId === productId);
  const variants = productVariants.find((v) => v.productId === productId);
  const details = productDetails.find((d) => d.productId === productId);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-6 container mx-auto max-w-7xl">
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