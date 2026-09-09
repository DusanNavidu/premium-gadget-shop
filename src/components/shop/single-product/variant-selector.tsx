"use client";

import { Check } from "lucide-react";

interface Option { label: string; priceAdjustment: number; }
interface ColorOpt { name: string; hex: string; imageRef?: string; }

interface VariantSelectorProps {
  variants: { colors?: ColorOpt[]; ramOptions?: Option[]; storageOptions?: Option[]; };
  selectedColor: ColorOpt | null;
  selectedRam: Option | null;
  selectedStorage: Option | null;
  onColorSelect: (c: ColorOpt) => void;
  onRamSelect: (r: Option) => void;
  onStorageSelect: (s: Option) => void;
}

const isLight = (hex: string) => {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
};

export function VariantSelector({
  variants, selectedColor, selectedRam, selectedStorage,
  onColorSelect, onRamSelect, onStorageSelect,
}: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {variants.colors && variants.colors.length > 0 && (
        <div>
          <span className="text-sm font-semibold text-foreground mb-3 block">
            Color{selectedColor && <span className="text-muted-foreground font-normal ml-1.5">— {selectedColor.name}</span>}
          </span>
          <div className="flex items-center gap-3 flex-wrap">
            {variants.colors.map((color, idx) => {
              const active = selectedColor?.name === color.name;
              return (
                <button
                  key={idx}
                  onClick={() => onColorSelect(color)}
                  aria-label={color.name}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${
                    active ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "border border-clay-border"
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  {active && <Check className={`w-4 h-4 ${isLight(color.hex) ? "text-neutral-900" : "text-white"}`} />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {variants.storageOptions && variants.storageOptions.length > 0 && (
        <div>
          <span className="text-sm font-semibold text-foreground mb-3 block">Storage Capacity</span>
          <div className="flex flex-wrap items-center gap-2.5">
            {variants.storageOptions.map((storage, idx) => {
              const active = selectedStorage?.label === storage.label;
              return (
                <button
                  key={idx}
                  onClick={() => onStorageSelect(storage)}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    active ? "border-primary bg-primary/10 text-primary" : "border-clay-border hover:border-foreground/25 text-foreground"
                  }`}
                >
                  {storage.label}
                  {storage.priceAdjustment > 0 && (
                    <span className={`text-[10px] ${active ? "text-primary/70" : "text-muted-foreground"}`}>
                      +${storage.priceAdjustment}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {variants.ramOptions && variants.ramOptions.length > 0 && (
        <div>
          <span className="text-sm font-semibold text-foreground mb-3 block">Unified Memory (RAM)</span>
          <div className="flex flex-wrap items-center gap-2.5">
            {variants.ramOptions.map((ram, idx) => {
              const active = selectedRam?.label === ram.label;
              return (
                <button
                  key={idx}
                  onClick={() => onRamSelect(ram)}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    active ? "border-primary bg-primary/10 text-primary" : "border-clay-border hover:border-foreground/25 text-foreground"
                  }`}
                >
                  {ram.label}
                  {ram.priceAdjustment > 0 && (
                    <span className={`text-[10px] ${active ? "text-primary/70" : "text-muted-foreground"}`}>
                      +${ram.priceAdjustment}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}