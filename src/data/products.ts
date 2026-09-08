export type ProductCategory = "mobile" | "computers" | "audio";

export interface Product {
  id: string;
  title: string;
  basePrice: number;
  category: ProductCategory;
  subCategory: string;
  thumbnail: string;
  rating?: number;
  reviewCount?: number;
  badge?: "New" | "Sale" | "Best Seller" | "Trending" | "Limited";
  inStock?: boolean;
}

export const products: Product[] = [
  {
    id: "iphone-17-pro-max",
    title: "iPhone 17 Pro Max",
    basePrice: 1199,
    category: "mobile",
    subCategory: "Flagship Smartphones",
    thumbnail: "/products/catalog/iphone-17-pro-max.png",
    rating: 4.8,
    reviewCount: 342,
    badge: "Best Seller",
    inStock: true,
  },
  {
    id: "macbook-pro-16-m3-max",
    title: 'MacBook Pro 16" M3 Max',
    basePrice: 3499,
    category: "computers",
    subCategory: "Ultrabooks",
    thumbnail: "/products/catalog/macbook-pro-16.png",
    rating: 4.9,
    reviewCount: 128,
    badge: "New",
    inStock: true,
  },
  {
    id: "sony-wh-1000xm5",
    title: "Sony WH-1000XM5",
    basePrice: 398,
    category: "audio",
    subCategory: "Noise-Canceling Headphones",
    thumbnail: "/products/catalog/sony-wh-1000xm5.png",
    rating: 4.7,
    reviewCount: 891,
    badge: "Sale",
    inStock: true,
  },
  {
    id: "magsafe-charger-pro",
    title: "MagSafe Charger Pro",
    basePrice: 49,
    category: "mobile",
    subCategory: "MagSafe Accessories",
    thumbnail: "/products/catalog/magsafe-charger.png",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
  },
];