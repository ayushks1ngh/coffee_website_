/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { TAX_RATE } from "@/lib/constants";
import { CURRENCY_CONFIG, type Currency } from "@/lib/currency";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  if (!rateLimit(`stripe:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await request.json();
  const { customer_name, customer_email, customer_phone, location_id, items, currency = "USD" } = body;

  if (!customer_name || !customer_email || !items?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isValidEmail(customer_email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const curr = currency as Currency;
  const rate = CURRENCY_CONFIG[curr]?.rate || 1;

  // Get user if authenticated
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  // Validate products
  const productIds = items.map((i: { product_id: string }) => i.product_id);
  const { data: products } = await supabaseAdmin.from("products").select("id, name, base_price").in("id", productIds);
  const { data: sizes } = await supabaseAdmin.from("product_sizes").select("product_id, size, price_multiplier").in("product_id", productIds);

  if (!products || !sizes) {
    return NextResponse.json({ error: "Invalid products" }, { status: 400 });
  }

  // Build line items for Stripe
  const lineItems = items.map((item: { product_id: string; size: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.product_id);
    const sizeData = sizes.find((s) => s.product_id === item.product_id && s.size === item.size);
    if (!product || !sizeData) return null;
    const unitPrice = Math.round(product.base_price * sizeData.price_multiplier * rate * 100);
    return {
      price_data: {
        currency: curr.toLowerCase(),
        product_data: { name: `${product.name} (${item.size})` },
        unit_amount: unitPrice,
      },
      quantity: item.quantity,
    };
  }).filter(Boolean);

  if (lineItems.length !== items.length) {
    return NextResponse.json({ error: "One or more items invalid" }, { status: 400 });
  }

  // Calculate totals for metadata
  const subtotal = lineItems.reduce((sum: number, li: any) => sum + (li.price_data.unit_amount * li.quantity), 0) / 100;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email,
    line_items: [
      ...lineItems,
      {
        price_data: {
          currency: curr.toLowerCase(),
          product_data: { name: "Tax" },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: user?.id || "",
      customer_name,
      customer_phone,
      location_id,
      items: JSON.stringify(items),
      subtotal: subtotal.toString(),
      tax: tax.toString(),
      total: total.toString(),
      currency: curr,
    },
    success_url: `${siteUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout`,
  });

  return NextResponse.json({ url: session.url });
}
