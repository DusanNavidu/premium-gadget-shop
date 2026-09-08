export interface HeroProduct {
  id: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  price: number;
  image: string; // path inside /public
  badge: string;
}

export const heroProducts: HeroProduct[] = [
  {
    id: "smartphone",
    eyebrow: "Flagship Smartphone",
    titlePrefix: "Power Meets",
    titleHighlight: "Precision Design",
    description:
      "Next-gen chipset, pro-grade camera system, and all-day battery — engineered for the way you actually use your phone.",
    price: 999,
    image: "/smartphone.png",
    badge: "New Arrival",
  },
  {
    id: "laptop",
    eyebrow: "Ultra Performance Laptop",
    titlePrefix: "Built for",
    titleHighlight: "Maximum Performance",
    description:
      "A featherlight chassis hiding desktop-class power. Render, code, and create without ever waiting on your machine.",
    price: 1499,
    image: "/laptop.png",
    badge: "Best Seller",
  },
  {
    id: "headset",
    eyebrow: "Immersive Audio Headset",
    titlePrefix: "Sound That",
    titleHighlight: "Feels Alive",
    description:
      "Studio-tuned drivers and adaptive noise cancellation deliver every detail, exactly the way the artist intended.",
    price: 500,
    image: "/headset.png",
    badge: "Trending",
  },
  {
    id: "smartwatch",
    eyebrow: "Smartwatch Series",
    titlePrefix: "Track Every",
    titleHighlight: "Moment That Matters",
    description:
      "Health metrics, notifications, and battery that outlasts your day — a companion built around your routine.",
    price: 349,
    image: "/smartwatch.png",
    badge: "Limited Stock",
  },
  {
    id: "tablet",
    eyebrow: "Pro Tablet",
    titlePrefix: "Create Without",
    titleHighlight: "Any Limits",
    description:
      "A canvas-sized display and pro-grade stylus support turn every idea into work you can ship the same day.",
    price: 799,
    image: "/tablet.png",
    badge: "Editor's Pick",
  },
];