export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
}

export const shippingMethods: ShippingMethod[] = [
  { id: "free", name: "Standard Shipping", price: 0, estimatedDays: "5-7 Business Days" },
  { id: "express", name: "Express Delivery", price: 15, estimatedDays: "2-3 Business Days" },
  { id: "overnight", name: "Overnight Premium", price: 35, estimatedDays: "Next Day Delivery" }
];