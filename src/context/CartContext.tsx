"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// ── Types ──
export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: "Small" | "Medium" | "Large";
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  toast: string | null;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
  toast: null,
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const addToCart = useCallback(
    (item: Omit<CartItem, "id" | "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        // Check if same drink + same size already exists
        const existing = prev.find(
          (i) => i.name === item.name && i.size === item.size
        );
        if (existing) {
          return prev.map((i) =>
            i.id === existing.id
              ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
              : i
          );
        }
        const id = `${item.name}-${item.size}-${Date.now()}`;
        return [...prev, { ...item, id, quantity: item.quantity ?? 1 }];
      });
      showToast(`${item.name} (${item.size}) added!`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
