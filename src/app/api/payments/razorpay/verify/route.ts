import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendOrderConfirmation } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, order_id } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !order_id) {
    return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
  }

  // Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Update order status to confirmed
  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .update({ status: "confirmed", payment_id: razorpay_payment_id, payment_provider: "razorpay" })
    .eq("id", order_id)
    .select()
    .single();

  if (error || !order) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }

  // Get order items for email
  const { data: items } = await supabaseAdmin
    .from("order_items")
    .select("product_name, size, quantity")
    .eq("order_id", order_id);

  // Send confirmation email
  sendOrderConfirmation(order.customer_email, {
    id: order.id,
    total: order.total,
    items: (items || []).map((i) => ({ name: i.product_name, size: i.size, quantity: i.quantity })),
  }).catch(() => {});

  return NextResponse.json({ success: true, order_id });
}
