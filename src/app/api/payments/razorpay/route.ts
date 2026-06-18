/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { TAX_RATE } from "@/lib/constants";
import { CURRENCY_CONFIG, type Currency } from "@/lib/currency";

export async function POST(request: Request) {
  const body = await request.json();
  const { customer_name, customer_email, customer_phone, location_id, items, notes, currency = "INR" } = body;

  if (!customer_name || !customer_email || !items?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const curr = currency as Currency;
  const rate = CURRENCY_CONFIG[curr]?.rate || 1;

  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  // Validate products and calculate price
  const productIds = items.map((i: { product_id: string }) => i.product_id);
  const { data: products } = await supabaseAdmin.from("products").select("id, name, base_price").in("id", productIds);
  const { data: sizes } = await supabaseAdmin.from("product_sizes").select("product_id, size, price_multiplier").in("product_id", productIds);

  if (!products || !sizes) {
    return NextResponse.json({ error: "Invalid products" }, { status: 400 });
  }

  const orderItems = items.map((item: { product_id: string; size: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.product_id);
    const sizeData = sizes.find((s) => s.product_id === item.product_id && s.size === item.size);
    if (!product || !sizeData) return null;
    const unitPrice = Math.round(product.base_price * sizeData.price_multiplier * rate * 100) / 100;
    return { product_id: item.product_id, product_name: product.name, size: item.size, quantity: item.quantity, unit_price: unitPrice };
  }).filter(Boolean);

  if (orderItems.length !== items.length) {
    return NextResponse.json({ error: "One or more items invalid" }, { status: 400 });
  }

  const subtotal = orderItems.reduce((sum: number, i: any) => sum + i.unit_price * i.quantity, 0);
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  // Create order in DB with status "pending"
  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      user_id: user?.id || null,
      location_id,
      customer_name,
      customer_email,
      customer_phone: customer_phone || "",
      subtotal,
      tax,
      total,
      notes: notes || "",
      status: "pending",
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: orderError?.message || "Failed to create order" }, { status: 500 });
  }

  // Insert order items
  await supabaseAdmin.from("order_items").insert(
    orderItems.map((i: any) => ({ ...i, order_id: order.id }))
  );

  // Create Razorpay order (amount in paise/smallest unit)
  const razorpayOrder = await getRazorpay().orders.create({
    amount: Math.round(total * 100),
    currency: curr,
    receipt: order.id,
    notes: { order_id: order.id, customer_name, customer_email },
  });

  return NextResponse.json({
    razorpay_order_id: razorpayOrder.id,
    order_id: order.id,
    amount: razorpayOrder.amount,
    currency: curr,
    key_id: process.env.RAZORPAY_KEY_ID,
  });
}
