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
  },
  {
    productId: "samsung-galaxy-s24-ultra",
    longDescription: "Titanium exterior. A stunning 6.8-inch flat display. The Galaxy S24 Ultra is the ultimate form of Galaxy Ultra, packed with meaningful AI features and a new 50MP telephoto lens.",
    specs: [
      { icon: "Monitor", label: "Display", value: '6.8" QHD+ AMOLED' },
      { icon: "Cpu", label: "Processor", value: "Snapdragon 8 Gen 3" },
      { icon: "Camera", label: "Camera", value: "200MP Main + 50MP Zoom" },
      { icon: "Zap", label: "Stylus", value: "Built-in S Pen" }
    ]
  },
  {
    productId: "oneplus-12",
    longDescription: "Smooth beyond belief. The OnePlus 12 balances elite performance with a stunning 2K 120Hz ProXDR display, powered by Snapdragon 8 Gen 3 and an enormous 5400mAh battery.",
    specs: [
      { icon: "Cpu", label: "Processor", value: "Snapdragon 8 Gen 3" },
      { icon: "Battery", label: "Battery", value: "5400 mAh" },
      { icon: "Zap", label: "Fast Charge", value: "100W SUPERVOOC" }
    ]
  },
  {
    productId: "ipad-pro-m4",
    longDescription: "The all-new iPad Pro packs astonishing power into an impossibly thin, light, and portable design. It features a breakthrough Ultra Retina XDR display and the incredibly fast M4 chip.",
    specs: [
      { icon: "Monitor", label: "Display", value: '13" Ultra Retina XDR OLED' },
      { icon: "Cpu", label: "Processor", value: "Apple M4 Chip" },
      { icon: "Battery", label: "Battery", value: "Up to 10 hours" }
    ]
  },
  {
    productId: "asus-rog-zephyrus-g14",
    longDescription: "Power, precision, and elegance define the new ROG Zephyrus G14. Featuring a CNC-milled aluminum chassis, an OLED Nebula Display, and next-gen RTX 40-series graphics.",
    specs: [
      { icon: "Monitor", label: "Display", value: '14" 3K OLED 120Hz' },
      { icon: "Cpu", label: "Processor", value: "Ryzen 9 8945HS" },
      { icon: "Zap", label: "Graphics", value: "NVIDIA RTX 4070" }
    ]
  },
  {
    productId: "lg-ultragear-27",
    longDescription: "Gear up for victory with the LG UltraGear OLED gaming monitor. Experience a breathtaking 240Hz refresh rate and a 0.03ms response time for ultimate competitive advantage.",
    specs: [
      { icon: "Monitor", label: "Display", value: '27" OLED 1440p' },
      { icon: "Zap", label: "Refresh Rate", value: "240Hz" },
      { icon: "Shield", label: "Response Time", value: "0.03ms GtG" }
    ]
  },
  {
    productId: "bose-qc-ultra",
    longDescription: "World-class noise cancellation, quieter than ever before. Breakthrough spatial audio for immersive listening, no matter the content or source. Elevated design and luxe materials.",
    specs: [
      { icon: "Speaker", label: "Audio", value: "Immersive Spatial Audio" },
      { icon: "Shield", label: "ANC", value: "CustomTune Tech" },
      { icon: "Battery", label: "Battery", value: "Up to 24 hours" }
    ]
  },
  {
    productId: "garmin-fenix-7x",
    longDescription: "There are 7 days in a week. And the fēnix 7X Sapphire Solar multisport GPS watch is built to go strong for all of them. Featuring a Power Sapphire solar charging lens.",
    specs: [
      { icon: "Watch", label: "Type", value: "Multisport GPS" },
      { icon: "Battery", label: "Battery", value: "Up to 37 days (Solar)" },
      { icon: "Droplets", label: "Water Rating", value: "10 ATM" }
    ]
  }
];