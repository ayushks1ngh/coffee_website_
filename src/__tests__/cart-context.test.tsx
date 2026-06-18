import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/context/CartContext";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockItem = {
  productId: "prod-1",
  name: "Espresso",
  price: 4.5,
  size: "Medium" as const,
  image: "/drinks/espresso.webp",
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
    expect(result.current.subtotal).toBe(0);
  });

  it("adds item to cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe("Espresso");
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.itemCount).toBe(1);
    expect(result.current.subtotal).toBe(4.5);
  });

  it("increments quantity for duplicate item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    act(() => result.current.addToCart(mockItem));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.subtotal).toBe(9);
  });

  it("treats different sizes as different items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    act(() => result.current.addToCart({ ...mockItem, size: "Large", price: 5.5 }));
    expect(result.current.items).toHaveLength(2);
  });

  it("removes item from cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    const id = result.current.items[0].id;
    act(() => result.current.removeFromCart(id));
    expect(result.current.items).toHaveLength(0);
  });

  it("updates quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    const id = result.current.items[0].id;
    act(() => result.current.updateQuantity(id, 5));
    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.subtotal).toBe(22.5);
  });

  it("does not set quantity below 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    const id = result.current.items[0].id;
    act(() => result.current.updateQuantity(id, 0));
    expect(result.current.items[0].quantity).toBe(1);
  });

  it("clears cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    act(() => result.current.addToCart({ ...mockItem, name: "Latte", size: "Large", price: 5 }));
    act(() => result.current.clearCart());
    expect(result.current.items).toHaveLength(0);
    expect(result.current.itemCount).toBe(0);
  });

  it("shows toast on add", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(mockItem));
    expect(result.current.toast).toBe("Espresso (Medium) added!");
  });
});
