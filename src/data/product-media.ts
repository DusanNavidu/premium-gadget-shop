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
      "/products/catalog/img-MacBook-Pro-Retina-16-Inch-24323-scaled-1250x1250-Photoroom.png",
      "/products/catalog/img-MacBook-Pro-Retina-16-Inch-52345-scaled-1250x1250-Photoroom.png",
    ],
  },
  {
    productId: "sony-wh-1000xm5",
    thumbnail: "/products/catalog/6145c1d32e6ac8e63a46c912dc33c5bb-Photoroom.png",
    gallery: [
      "/products/catalog/111295_original_local_1200x1050_v3_converted-Photoroom.png",
      "/products/catalog/images (23)-Photoroom.png",
      "/products/catalog/89733112_8.webp",
      "/products/catalog/images (27).jpg",
    ],
  },
  {
    productId: "magsafe-charger-pro",
    thumbnail: "/products/catalog/fee232ef1ebbb43eed3b194dae099489.jpg_720x720q80.jpg",
    gallery: [
      "/products/catalog/61GQIWnARSL._AC_UF894,1000_QL80_.jpg",
      "/products/catalog/870846cbe1e6379d1ce4194d923e9846.jpg_720x720q80.jpg",
      "/products/catalog/4-1.png"
    ], // no extra angles — slideshow just stays on the thumbnail
  },
  {
    productId: "samsung-galaxy-s24-ultra",
    thumbnail: "/products/catalog/samsung-s24-ultra.png",
    gallery: [],
  },
  {
    productId: "oneplus-12",
    thumbnail: "/products/catalog/oneplus-12.png",
    gallery: [],
  },
  {
    productId: "asus-rog-zephyrus-g14",
    thumbnail: "/products/catalog/asus-g14.png",
    gallery: [],
  },
  {
    productId: "lg-ultragear-27",
    thumbnail: "/products/catalog/lg-ultragear.png",
    gallery: [],
  },
  {
    productId: "bose-qc-ultra",
    thumbnail: "/products/catalog/bose-qc-ultra.png",
    gallery: [],
  },
  {
    productId: "garmin-fenix-7x",
    thumbnail: "/products/catalog/garmin-fenix.png",
    gallery: [],
  }
];