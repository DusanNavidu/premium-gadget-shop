export interface ColorOption {
  name: string;
  hex: string;
}

export interface StorageOption {
  label: string;
  priceAdjustment: number; // added to basePrice when selected
}

export interface RamOption {
  label: string;
  priceAdjustment: number;
}

export interface ProductVariant {
  productId: string; // foreign key → products.id
  colors?: ColorOption[];
  ramOptions?: RamOption[];
  storageOptions?: StorageOption[];
}

// Only products that need a configuration step appear here.
// A product with NO entry in this array is treated as a simple, single-SKU
// item — its card shows "Add to Cart" instead of "Select Options".
export const productVariants: ProductVariant[] = [
  {
    productId: "iphone-17-pro-max",
    colors: [
      { name: "Titanium orange", hex: "#f4a261" },
      { name: "Titanium White", hex: "#f2f1ec" },
      { name: "Titanium Blue", hex: "#3f4a5a" },
    ],
    storageOptions: [
      { label: "256GB", priceAdjustment: 0 },
      { label: "512GB", priceAdjustment: 200 },
      { label: "1TB", priceAdjustment: 400 },
    ],
  },
  {
    productId: "macbook-pro-16-m3-max",
    colors: [
      { name: "Space Black", hex: "#1d1d1f" },
      { name: "Silver", hex: "#e3e4e5" },
    ],
    ramOptions: [
      { label: "36GB", priceAdjustment: 0 },
      { label: "48GB", priceAdjustment: 400 },
      { label: "64GB", priceAdjustment: 800 },
    ],
    storageOptions: [
      { label: "1TB", priceAdjustment: 0 },
      { label: "2TB", priceAdjustment: 600 },
    ],
  },
  {
    productId: "sony-wh-1000xm5",
    colors: [
      { name: "Black", hex: "#0f0f0f" },
      { name: "Platinum Silver", hex: "#d8d6d0" },
      { name: "Midnight Blue", hex: "#1f2a44" },
    ],
  },
  // "magsafe-charger-pro" has no entry → renders "Add to Cart", not "Select Options".
];