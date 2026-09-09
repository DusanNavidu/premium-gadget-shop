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
  {
    productId: "samsung-galaxy-s24-ultra",
    colors: [
      { name: "Titanium Gray", hex: "#7a7a7a" },
      { name: "Titanium Violet", hex: "#5a4d6b" },
      { name: "Titanium Yellow", hex: "#d8c47b" },
    ],
    storageOptions: [
      { label: "256GB", priceAdjustment: 0 },
      { label: "512GB", priceAdjustment: 120 },
      { label: "1TB", priceAdjustment: 350 },
    ],
  },
  {
    productId: "ipad-pro-m4",
    colors: [
      { name: "Space Black", hex: "#1d1d1f" },
      { name: "Silver", hex: "#e3e4e5" },
    ],
    storageOptions: [
      { label: "256GB", priceAdjustment: 0 },
      { label: "512GB", priceAdjustment: 200 },
      { label: "1TB", priceAdjustment: 600 }, // 1TB includes extra RAM on iPad Pros
    ],
  },
  {
    productId: "asus-rog-zephyrus-g14",
    colors: [
      { name: "Eclipse Gray", hex: "#2b2b2b" },
      { name: "Moonlight White", hex: "#f0f0f0" },
    ],
    ramOptions: [
      { label: "16GB", priceAdjustment: 0 },
      { label: "32GB", priceAdjustment: 150 },
    ]
  },
  {
    productId: "bose-qc-ultra",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White Smoke", hex: "#e0e0e0" },
      { name: "Sandstone", hex: "#d4c8bd" }
    ],
  },
  {
    productId: "apple-watch-ultra-2",
    colors: [
      { name: "Titanium with Alpine Loop", hex: "#e56c3a" },
      { name: "Titanium with Ocean Band", hex: "#2a3b5c" },
    ]
  }
];