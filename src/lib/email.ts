import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmation(
  to: string,
  orderData: { id: string; total: number; items: { name: string; size: string; quantity: number }[] }
) {
  const itemsList = orderData.items
    .map((i) => `• ${i.name} (${i.size}) × ${i.quantity}`)
    .join("\n");

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Coffee Crave <onboarding@resend.dev>",
    to,
    subject: `Order Confirmed — #${orderData.id.slice(0, 8).toUpperCase()}`,
    text: `Your Coffee Crave order is confirmed!\n\nOrder #${orderData.id.slice(0, 8).toUpperCase()}\n\n${itemsList}\n\nTotal: $${orderData.total.toFixed(2)}\n\nWe'll have it ready for pickup shortly.\n\n— Coffee Crave`,
  });
}
