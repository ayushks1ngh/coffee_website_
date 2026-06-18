/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendOrderConfirmation } from "@/lib/email";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata!;

    const items = JSON.parse(meta.items);

    // Validate products for order items
    const productIds = items.map((i: { product_id: string }) => i.product_id);
    const { data: products } = await supabaseAdmin.from("products").select("id, name, base_price").in("id", productIds);
    const { data: sizes } = await supabaseAdmin.from("product_sizes").select("product_id, size, price_multiplier").in("product_id", productIds);

    const rate = meta.currency === "INR" ? 85 : 1;

    const orderItems = items.map((item: { product_id: string; size: string; quantity: number }) => {
      const product = products?.find((p) => p.id === item.product_id);
      const sizeData = sizes?.find((s) => s.product_id === item.product_id && s.size === item.size);
      if (!product || !sizeData) return null;
      const unitPrice = Math.round(product.base_price * sizeData.price_multiplier * rate * 100) / 100;
      return { product_id: item.product_id, product_name: product.name, size: item.size, quantity: item.quantity, unit_price: unitPrice };
    }).filter(Boolean);

    // Create order
    const { data: order } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: meta.user_id || null,
        location_id: meta.location_id,
        customer_name: meta.customer_name,
        customer_email: session.customer_email,
        customer_phone: meta.customer_phone || "",
        subtotal: parseFloat(meta.subtotal),
        tax: parseFloat(meta.tax),
        total: parseFloat(meta.total),
        status: "confirmed",
        payment_id: session.payment_intent as string,
        payment_provider: "stripe",
      })
      .select()
      .single();

    if (order) {
      await supabaseAdmin.from("order_items").insert(
        orderItems.map((i: any) => ({ ...i, order_id: order.id }))
      );

      sendOrderConfirmation(session.customer_email!, {
        id: order.id,
        total: order.total,
        items: orderItems.map((i: any) => ({ name: i.product_name, size: i.size, quantity: i.quantity })),
      }).catch(() => {});
    }
  }

  return NextResponse.json({ received: true });
}
