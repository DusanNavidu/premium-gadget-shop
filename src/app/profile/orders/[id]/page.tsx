import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import { orders } from "@/data/orders";
import { StatusBadge } from "@/components/profile/status-badge";
import { TrackingTimeline } from "@/components/profile/tracking-timeline";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();

  const formatPrice = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  return (
    <div className="space-y-6">
      <Link href="/profile/orders" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground w-fit transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{order.id}</h2>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Placed on {new Date(order.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <span className="text-2xl font-extrabold text-foreground">{formatPrice(order.total)}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tracking */}
        <div className="clay-card p-6 md:p-8 rounded-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm">Tracking</h3>
              <p className="text-xs text-muted-foreground font-mono">{order.trackingNumber}</p>
            </div>
          </div>
          <TrackingTimeline steps={order.trackingSteps} />
        </div>

        {/* Items + address */}
        <div className="space-y-6">
          <div className="clay-card p-6 md:p-8 rounded-4xl">
            <h3 className="font-bold text-foreground text-sm mb-4">Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl bg-foreground/[0.04] border border-clay-border overflow-hidden shrink-0">
                    <Image src={item.thumbnail} alt={item.title} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground line-clamp-1">{item.title}</p>
                    {item.variant && <p className="text-xs text-muted-foreground mt-0.5">{item.variant}</p>}
                    <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-foreground shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="clay-card p-6 md:p-8 rounded-4xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-sm">Shipping Address</h3>
            </div>
            <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}