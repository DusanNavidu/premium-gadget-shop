export interface ProductMedia {
  productId: string; // foreign key → products.id
  thumbnail: string;
  gallery: string[]; // extra angles cycled during the hover slideshow
}

export const productMedia: ProductMedia[] = [
  {
    productId: "iphone-17-pro-max",
    thumbnail: "/products/catalog/iphone-17-pro-max.png",
    gallery: [
      "/products/catalog/Apple-iPhone-17-Pro-Max-white.png",
      "/products/catalog/images (24)-Photoroom.png",
      "/products/catalog/images (25)-Photoroom.png",
    ],
  },
  {
    productId: "macbook-pro-16-m3-max",
    thumbnail: "/products/catalog/macbook-pro-16.png",
    gallery: [
      "/products/catalog/macbook-pro-16-open.png",
      "/products/catalog/macbook-pro-16-ports.png",
    ],
  },
  {
    productId: "sony-wh-1000xm5",
    thumbnail: "/products/catalog/sony-wh-1000xm5.png",
    gallery: [
      "/products/catalog/sony-wh-1000xm5-folded.png",
      "/products/catalog/sony-wh-1000xm5-case.png",
    ],
  },
  {
    productId: "magsafe-charger-pro",
    thumbnail: "/products/catalog/magsafe-charger.png",
    gallery: [], // no extra angles — slideshow just stays on the thumbnail
  },
];