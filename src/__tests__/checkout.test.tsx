import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutPage from "@/app/checkout/CheckoutPage";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock next/script
vi.mock("next/script", () => ({ default: () => null }));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock contexts
const mockItems = [
  { id: "1", productId: "p1", name: "Espresso", price: 4.5, size: "Medium", quantity: 2, image: "/test.webp" },
];

vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    items: mockItems,
    subtotal: 9,
    clearCart: vi.fn(),
  }),
}));

vi.mock("@/context/CurrencyContext", () => ({
  useCurrency: () => ({
    currency: "USD",
    format: (p: number) => `$${p.toFixed(2)}`,
    convert: (p: number) => p,
  }),
}));

// Mock PageShell
vi.mock("@/components/PageShell", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("CheckoutPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ locations: [{ id: "loc1", city: "NYC", address: "123 Main" }] }),
    });
  });

  it("renders checkout form with cart items", async () => {
    render(<CheckoutPage />);
    expect(screen.getByText("CHECKOUT")).toBeInTheDocument();
    expect(screen.getByText("Espresso")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
  });

  it("shows both payment methods", () => {
    render(<CheckoutPage />);
    expect(screen.getByText("💳 Card")).toBeInTheDocument();
    expect(screen.getByText("🇮🇳 UPI / Card")).toBeInTheDocument();
  });

  it("disables submit when form is incomplete", () => {
    render(<CheckoutPage />);
    const submitBtn = screen.getByRole("button", { name: /pay with card/i });
    expect(submitBtn).toBeDisabled();
  });

  it("enables submit when form is filled", async () => {
    render(<CheckoutPage />);

    fireEvent.change(screen.getByPlaceholderText("Your name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("your@email.com"), { target: { value: "j@j.com" } });
    fireEvent.change(screen.getByPlaceholderText("+91 000 000 0000"), { target: { value: "1234567890" } });

    await waitFor(() => {
      const submitBtn = screen.getByRole("button", { name: /pay with card/i });
      expect(submitBtn).not.toBeDisabled();
    });
  });

  it("switches payment method on click", () => {
    render(<CheckoutPage />);
    const razorpayBtn = screen.getByText("🇮🇳 UPI / Card");
    fireEvent.click(razorpayBtn);
    expect(screen.getByText(/UPI.*GPay.*PhonePe/)).toBeInTheDocument();
  });
});
