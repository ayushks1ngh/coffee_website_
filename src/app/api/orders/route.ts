import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";
import { sendOrderConfirmation } from "@/lib/email";
import { TAX_RATE } from "@/lib/constants";

export async function GET() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { customer_name, customer_email, customer_phone, location_id, items, notes } = body;

  if (!customer_name || !customer_email || !items?.length) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Get current user (optional — guest checkout allowed)
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  // Validate items and calculate prices
  const productIds = items.map((i: { product_id: string }) => i.product_id);
  const { data: products } = await supabaseAdmin
    .from("products")
    .select("id, name, base_price")
    .in("id", productIds);

  const { data: sizes } = await supabaseAdmin
    .from("product_sizes")
    .select("product_id, size, price_multiplier")
    .in("product_id", productIds);

  if (!products || !sizes) {
    return NextResponse.json({ error: "Invalid products" }, { status: 400 });
  }

  // Build order items with calculated prices
  const orderItems = items.map((item: { product_id: string; size: string; quantity: number }) => {
    const product = products.find((p) => p.id === item.product_id);
    const sizeData = sizes.find((s) => s.product_id === item.product_id && s.size === item.size);
    if (!product || !sizeData) return null;
    const unitPrice = Number((product.base_price * sizeData.price_multiplier).toFixed(2));
    return {
      product_id: item.product_id,
      product_name: product.name,
      size: item.size,
      quantity: item.quantity,
      unit_price: unitPrice,
    };
  }).filter(Boolean);

  if (orderItems.length !== items.length) {
    return NextResponse.json({ error: "One or more items invalid" }, { status: 400 });
  }

  const subtotal = orderItems.reduce(
    (sum: number, i: { unit_price: number; quantity: number }) => sum + i.unit_price * i.quantity, 0
  );
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  // Insert order
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
      status: "confirmed",
    })
    .select()
    .single();

  if (orderError || !order) {
    return NextResponse.json({ error: orderError?.message || "Failed to create order" }, { status: 500 });
  }

  // Insert order items
  const { error: itemsError } = await supabaseAdmin
    .from("order_items")
    .insert(orderItems.map((i: { product_id: string; product_name: string; size: string; quantity: number; unit_price: number }) => ({ ...i, order_id: order.id })));

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  // Send confirmation email (fire and forget)
  sendOrderConfirmation(customer_email, {
    id: order.id,
    total,
    items: orderItems.map((i: { product_name: string; size: string; quantity: number }) => ({
      name: i.product_name,
      size: i.size,
      quantity: i.quantity,
    })),
  }).catch(() => {});

  return NextResponse.json({ order, items: orderItems }, { status: 201 });
}
