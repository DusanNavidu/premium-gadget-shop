"use client";

import { Cpu, Battery, Droplets, Wifi, Monitor, Bluetooth, Camera, Zap, Shield, Speaker, Mic, Truck } from "lucide-react";

interface ProductSpec {
  icon: string;
  label: string;
  value: string;
}

interface ProductSpecificationsProps {
  specs?: ProductSpec[];
}

const iconMap: Record<string, any> = {
  Cpu, Battery, Droplets, Wifi, Monitor, Bluetooth, Camera, Zap, Shield, Speaker, Mic, Truck,
};

const renderIcon = (iconName: string, className = "w-5 h-5") => {
  const Icon = iconMap[iconName] || Zap;
  return <Icon className={className} />;
};

export function ProductSpecifications({ specs }: ProductSpecificationsProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="clay-card p-6 rounded-4xl">
      <h3 className="text-lg font-bold text-foreground mb-5">Specifications</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {specs.map((spec, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-4 rounded-2xl bg-foreground/[0.03] hover:bg-foreground/[0.06] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-accent text-primary-foreground flex items-center justify-center mb-2.5 shadow-sm shadow-primary/30">
              {renderIcon(spec.icon, "w-5 h-5")}
            </div>
            <span className="text-[10px] uppercase tracking-wide font-bold text-muted-foreground">{spec.label}</span>
            <span className="text-xs font-semibold text-foreground mt-0.5">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}