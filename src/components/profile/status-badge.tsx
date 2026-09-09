import type { OrderStatus } from "@/data/orders";

const styles: Record<OrderStatus, string> = {
  Processing: "bg-warning/15 text-warning",
  Shipped: "bg-accent/15 text-accent",
  "Out for Delivery": "bg-primary/15 text-primary",
  Delivered: "bg-success/15 text-success",
  Cancelled: "bg-destructive/15 text-destructive",
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}