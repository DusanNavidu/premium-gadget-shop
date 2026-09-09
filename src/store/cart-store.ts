import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';
import type { ShippingMethod } from '@/data/shipping-methods';

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  finalPrice: number;
  selectedColor?: { name: string; hex: string } | null;
  selectedRam?: { label: string; priceAdjustment: number } | null;
  selectedStorage?: { label: string; priceAdjustment: number } | null;
  selectedShipping?: ShippingMethod | null;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      
      addItem: (item) => {
        set((state) => {
          const cartItemId = `${item.product.id}-${item.selectedColor?.name || ''}-${item.selectedRam?.label || ''}-${item.selectedStorage?.label || ''}`;
          
          const existingItem = state.items.find((i) => i.cartItemId === cartItemId);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
              isOpen: true,
            };
          }
          
          return { 
            items: [...state.items, { ...item, cartItemId }],
            isOpen: true,
          };
        });
      },
      
      removeItem: (cartItemId) => {
        set((state) => ({ items: state.items.filter((i) => i.cartItemId !== cartItemId) }));
      },
      
      updateQuantity: (cartItemId, quantity) => {
        set((state) => ({
          items: state.items.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i)),
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
      },
    }),
    {
      name: 'techvault-cart',
    }
  )
);