import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock supabase modules
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockFrom = vi.fn(() => ({ select: mockSelect, insert: mockInsert }));
const mockGetUser = vi.fn();

vi.mock("@/lib/supabase/admin", () => ({
  supabaseAdmin: { from: (...args: any[]) => mockFrom(...args) },
}));

vi.mock("@/lib/supabase/server", () => ({
  createServerSupabase: () => ({
    auth: { getUser: mockGetUser },
  }),
}));

vi.mock("@/lib/email", () => ({
  sendOrderConfirmation: vi.fn().mockResolvedValue(undefined),
}));

describe("GET /api/products", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns products from supabase", async () => {
    const mockProducts = [
      { id: "1", name: "Espresso", slug: "espresso", base_price: 4.5 },
      { id: "2", name: "Latte", slug: "latte", base_price: 5.0 },
    ];

    const mockQuery = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      contains: vi.fn().mockReturnThis(),
      then: vi.fn(),
    };
    // Make it thenable (resolve)
    mockFrom.mockImplementation((table: string) => {
      if (table === "products") {
        return {
          select: () => ({
            eq: () => ({
              order: () => Promise.resolve({ data: mockProducts, error: null }),
            }),
          }),
        };
      }
      return { select: () => Promise.resolve({ data: [], error: null }) };
    });

    const { GET } = await import("@/app/api/products/route");
    const request = new Request("http://localhost/api/products");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects missing fields", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Test" }), // missing email & message
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});

describe("GET /api/orders", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns 401 without auth", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const { GET } = await import("@/app/api/orders/route");
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Unauthorized");
  });
});

describe("POST /api/orders", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects missing required fields", async () => {
    mockGetUser.mockResolvedValue({ data: { user: null } });

    const { POST } = await import("@/app/api/orders/route");
    const request = new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer_name: "Test" }), // missing email & items
    });
    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
