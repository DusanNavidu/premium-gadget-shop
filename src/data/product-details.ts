export interface ProductSpec {
  icon: string; // e.g., "Cpu", "Battery", "Droplets", "Wifi", "Monitor"
  label: string;
  value: string;
}

export interface ProductDetail {
  productId: string;
  longDescription: string;
  specs: ProductSpec[];
}

export const productDetails: ProductDetail[] = [
  {
    productId: "iphone-17-pro-max",
    longDescription: "Experience the next generation of mobile technology. Forged in aerospace-grade titanium, the iPhone 17 Pro Max features our most advanced Pro camera system ever, the blazing-fast A19 Pro chip for next-level gaming, and all-day battery life. It is designed to be lighter, stronger, and more capable.",
    specs: [
      { icon: "Monitor", label: "Display", value: '6.9" Super Retina XDR' },
      { icon: "Cpu", label: "Processor", value: "A19 Pro Bionic" },
      { icon: "Battery", label: "Battery", value: "Up to 29 hrs video" },
      { icon: "Droplets", label: "Water Resistance", value: "IP68" },
      { icon: "Camera", label: "Main Camera", value: "48MP Pro System" },
      { icon: "Zap", label: "Charging", value: "MagSafe & Type-C" }
    ]
  },
  {
    productId: "macbook-pro-16-m3-max",
    longDescription: "The 16-inch MacBook Pro blasts forward with the M3 Max chip. Featuring an advanced thermal design, it sustains extreme performance for the most demanding workflows. The Liquid Retina XDR display is the best ever in a laptop, offering Extreme Dynamic Range and incredible contrast.",
    specs: [
      { icon: "Monitor", label: "Display", value: '16.2" Liquid Retina XDR' },
      { icon: "Cpu", label: "Chip", value: "Apple M3 Max" },
      { icon: "Battery", label: "Battery Life", value: "Up to 22 hours" },
      { icon: "Wifi", label: "Connectivity", value: "Wi-Fi 6E & BT 5.3" },
      { icon: "Speaker", label: "Audio", value: "6-speaker sound" }
    ]
  },
  {
    productId: "sony-wh-1000xm5",
    longDescription: "Rewrite the rules of listening with the Sony WH-1000XM5. Industry-leading noise cancellation is powered by two processors and eight microphones. The specially designed 30mm driver unit provides exceptional sound quality, making every track feel like a live performance.",
    specs: [
      { icon: "Bluetooth", label: "Bluetooth", value: "Version 5.2" },
      { icon: "Battery", label: "Battery Life", value: "Up to 30 hours" },
      { icon: "Shield", label: "Noise Canceling", value: "Dual Processor ANC" },
      { icon: "Mic", label: "Microphones", value: "8 built-in mics" }
    ]
  }
];