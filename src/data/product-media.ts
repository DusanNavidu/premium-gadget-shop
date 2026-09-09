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
    productId: "anker-737-powerbank",
    thumbnail: "/products/catalog/images (28).jpg",
    gallery: [
      "/products/catalog/image_b7551ce1-3e31-451f-ab4b-ea3f533f7592.webp",
      "/products/catalog/images (29).jpg",
      "/products/catalog/A1289011_TD03_V1.webp",
      "/products/catalog/A1289011_TD04_V1.webp"
    ],
  },
  {
    productId: "samsung-galaxy-s24-ultra",
    thumbnail: "/products/catalog/3-2.jpg",
    gallery: [
      "/products/catalog/Samsung_Galaxy_S24_Ultra_5G_Titanium_Blue_ONEi_1.webp",
      "/products/catalog/images (32).jpg",
      "/products/catalog/images (31).jpg",
      "/products/catalog/images (30).jpg",
      "/products/catalog/31YlS9zbaKL.jpg",
      "/products/catalog/b76f9a22-ecce-4242-9e0b-ba9e622e0822.0aeb855fbecaa384d3d8f7fc2da5eb4d.avif"
    ],
  },
  {
    productId: "oneplus-12",
    thumbnail: "/products/catalog/OnePlus-12-5G-Flowy-Emerald.jpg",
    gallery: [],
  },
  {
    productId: "asus-rog-zephyrus-g14",
    thumbnail: "/products/catalog/images (34).jpg",
    gallery: [],
  },
  {
    productId: "lg-ultragear-27",
    thumbnail: "/products/catalog/Monitor-27GR95QE-B-OLED-Gallery_3000x3000.avif",
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