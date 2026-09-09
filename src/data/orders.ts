export type OrderStatus = "Processing" | "Shipped" | "Out for Delivery" | "Delivered" | "Cancelled";

export interface OrderItem {
  productId: string;
  title: string;
  thumbnail: string;
  quantity: number;
  price: number;
  variant?: string;
}

export interface TrackingStep {
  label: string;
  date: string;
  completed: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  trackingNumber: string;
  shippingAddress: string;
  items: OrderItem[];
  trackingSteps: TrackingStep[];
}

export const orders: Order[] = [
  {
    id: "TV-2026-10231",
    date: "2026-09-02",
    status: "Delivered",
    total: 1249,
    trackingNumber: "1Z999AA10123456784",
    shippingAddress: "123 Tech Lane, Suite 4, San Francisco, CA 94105",
    items: [
      { productId: "sony-wh-1000xm5", title: "Sony WH-1000XM5", thumbnail: "/products/catalog/sony-wh-1000xm5.png", quantity: 1, price: 398 },
      { productId: "magsafe-charger-pro", title: "MagSafe Charger Pro", thumbnail: "/products/catalog/magsafe-charger.png", quantity: 2, price: 49 },
    ],
    trackingSteps: [
      { label: "Order Placed", date: "Sep 2, 9:12 AM", completed: true },
      { label: "Processing", date: "Sep 2, 2:40 PM", completed: true },
      { label: "Shipped", date: "Sep 3, 8:05 AM", completed: true },
      { label: "Out for Delivery", date: "Sep 5, 7:30 AM", completed: true },
      { label: "Delivered", date: "Sep 5, 1:15 PM", completed: true },
    ],
  },
  {
    id: "TV-2026-10456",
    date: "2026-09-06",
    status: "Out for Delivery",
    total: 3499,
    trackingNumber: "1Z999AA10123458821",
    shippingAddress: "123 Tech Lane, Suite 4, San Francisco, CA 94105",
    items: [
      { productId: "macbook-pro-16-m3-max", title: 'MacBook Pro 16" M3 Max', thumbnail: "/products/catalog/macbook-pro-16.png", quantity: 1, price: 3499, variant: "Space Black · 36GB · 1TB" },
    ],
    trackingSteps: [
      { label: "Order Placed", date: "Sep 6, 11:20 AM", completed: true },
      { label: "Processing", date: "Sep 6, 4:00 PM", completed: true },
      { label: "Shipped", date: "Sep 7, 9:10 AM", completed: true },
      { label: "Out for Delivery", date: "Sep 9, 6:45 AM", completed: true },
      { label: "Delivered", date: "Estimated Sep 9", completed: false },
    ],
  },
  {
    id: "TV-2026-10502",
    date: "2026-09-08",
    status: "Processing",
    total: 1199,
    trackingNumber: "1Z999AA10123459933",
    shippingAddress: "123 Tech Lane, Suite 4, San Francisco, CA 94105",
    items: [
      { productId: "iphone-17-pro-max", title: "iPhone 17 Pro Max", thumbnail: "/products/catalog/iphone-17-pro-max.png", quantity: 1, price: 1199, variant: "Titanium Blue · 256GB" },
    ],
    trackingSteps: [
      { label: "Order Placed", date: "Sep 8, 3:05 PM", completed: true },
      { label: "Processing", date: "Sep 8, 5:30 PM", completed: true },
      { label: "Shipped", date: "Pending", completed: false },
      { label: "Out for Delivery", date: "Pending", completed: false },
      { label: "Delivered", date: "Pending", completed: false },
    ],
  },
];