export type ProductCategory = "mobile" | "computers" | "audio";

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  subCategory: string; // e.g. "Flagship Smartphones", "Gaming Laptops"
  image: string;
  secondaryImage?: string; // shown on hover — physical-store feel
  rating?: number;
  reviewCount?: number;
  badge?: "New" | "Sale" | "Best Seller" | "Trending" | "Limited";
  inStock?: boolean;
  description?: string; // used by Quick View modal
  specs?: { label: string; value: string }[]; // used by Quick View modal
}

export const CATEGORY_TABS: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All Products" },
  { id: "mobile", label: "Mobile Devices" },
  { id: "computers", label: "Computers & Laptops" },
  { id: "audio", label: "Audio & Wearables" },
];

// Add as many products as you want — grid, tabs, and filtering
// all read straight from this array.
export const products: Product[] = [
  {
    id: "iphone-17-pro-max",
    title: "iPhone 17 Pro Max",
    price: 1199,
    category: "mobile",
    subCategory: "Flagship Smartphones",
    image: "/products/catalog/iphone-17-pro-max.png",
    secondaryImage: "/products/catalog/iphone-17-pro-max-back.png",
    rating: 4.8,
    reviewCount: 342,
    badge: "Best Seller",
    inStock: true,
    description: "The most capable iPhone yet, with a titanium frame and pro camera system.",
    specs: [
      { label: "Display", value: '6.9" Super Retina XDR' },
      { label: "Chip", value: "A19 Pro" },
      { label: "Storage", value: "256GB" },
    ],
  },
  {
    id: "ipad-pro-13",
    title: 'iPad Pro 13" M4',
    price: 1299,
    category: "mobile",
    subCategory: "Tablets",
    image: "/products/catalog/ipad-pro-13.png",
    secondaryImage: "/products/catalog/ipad-pro-13-side.png",
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    description: "Ultra-thin, ultra-powerful. The most advanced display Apple has ever made.",
    specs: [
      { label: "Display", value: '13" Ultra Retina XDR' },
      { label: "Chip", value: "Apple M4" },
      { label: "Storage", value: "512GB" },
    ],
  },
  {
    id: "magsafe-charger-pro",
    title: "MagSafe Charger Pro",
    price: 49,
    category: "mobile",
    subCategory: "MagSafe Accessories",
    image: "/products/catalog/magsafe-charger.png",
    rating: 4.5,
    reviewCount: 89,
    inStock: true,
    description: "15W fast wireless charging with perfect magnetic alignment.",
    specs: [{ label: "Output", value: "15W" }, { label: "Cable", value: "1.5m braided" }],
  },
  {
    id: "macbook-pro-16-m3-max",
    title: 'MacBook Pro 16" M3 Max',
    price: 3499,
    category: "computers",
    subCategory: "Ultrabooks",
    image: "/products/catalog/macbook-pro-16.png",
    secondaryImage: "/products/catalog/macbook-pro-16-open.png",
    rating: 4.9,
    reviewCount: 128,
    badge: "New",
    inStock: true,
    description: "Extreme performance for the most demanding workflows.",
    specs: [
      { label: "Chip", value: "M3 Max" },
      { label: "RAM", value: "36GB" },
      { label: "Storage", value: "1TB SSD" },
    ],
  },
  {
    id: "rog-strix-scar-18",
    title: "ROG Strix Scar 18",
    price: 2799,
    category: "computers",
    subCategory: "Gaming Laptops",
    image: "/products/catalog/rog-strix-scar-18.png",
    rating: 4.7,
    reviewCount: 64,
    badge: "Trending",
    inStock: true,
    description: "Desktop-class gaming performance in a laptop chassis.",
    specs: [
      { label: "GPU", value: "RTX 4090" },
      { label: "Display", value: '18" 240Hz' },
    ],
  },
  {
    id: "samsung-odyssey-g9",
    title: "Samsung Odyssey G9",
    price: 1299,
    category: "computers",
    subCategory: "High-Res Monitors",
    image: "/products/catalog/samsung-odyssey-g9.png",
    rating: 4.6,
    reviewCount: 204,
    inStock: true,
    description: "Immersive curved gaming monitor with stunning color accuracy.",
    specs: [{ label: "Size", value: '49"' }, { label: "Resolution", value: "5120x1440" }],
  },
  {
    id: "keychron-q1-pro",
    title: "Keychron Q1 Pro",
    price: 199,
    category: "computers",
    subCategory: "Mechanical Keyboards",
    image: "/products/catalog/keychron-q1-pro.png",
    rating: 4.7,
    reviewCount: 312,
    inStock: false,
    description: "A gasket-mounted custom mechanical keyboard, wireless-ready.",
    specs: [{ label: "Switches", value: "Hot-swappable" }, { label: "Connectivity", value: "Bluetooth 5.1" }],
  },
  {
    id: "sony-wh-1000xm5",
    title: "Sony WH-1000XM5",
    price: 398,
    originalPrice: 449,
    category: "audio",
    subCategory: "Noise-Canceling Headphones",
    // ඔයාගේ පරණ නිවැරදි Path එක මෙහි යොදා ඇත
    image: "/products/catalog/SONY-WH-1000XM5-1-Photoroom.png",
    secondaryImage: "/products/catalog/sony-wh-1000xm5-folded.png",
    rating: 4.7,
    reviewCount: 891,
    badge: "Sale",
    inStock: true,
    description: "Industry-leading noise cancellation with exceptional sound quality.",
    specs: [{ label: "Battery", value: "30 hours" }, { label: "Driver", value: "30mm" }],
  },
  {
    id: "apple-watch-ultra-2",
    title: "Apple Watch Ultra 2",
    price: 799,
    category: "audio",
    subCategory: "Smartwatches",
    image: "/products/catalog/apple-watch-ultra-2.png",
    rating: 4.7,
    reviewCount: 267,
    badge: "Limited",
    inStock: false,
    description: "Built for endurance, exploration, and every kind of workout.",
    specs: [{ label: "Battery", value: "36 hours" }, { label: "Case", value: "49mm Titanium" }],
  },
  {
    id: "galaxy-buds-3-pro",
    title: "Galaxy Buds 3 Pro",
    price: 249,
    category: "audio",
    subCategory: "TWS Earbuds",
    image: "/products/catalog/galaxy-buds-3-pro.png",
    rating: 4.5,
    reviewCount: 178,
    inStock: true,
    description: "Crystal-clear calls and immersive sound in a compact design.",
    specs: [{ label: "ANC", value: "Adaptive" }, { label: "Battery", value: "8h + 20h case" }],
  },
];