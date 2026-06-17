import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: order, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !order) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Check ownership or admin
  if (order.user_id !== user.id) {
    const { data: profile } = await supabaseAdmin.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { data: items } = await supabaseAdmin
    .from("order_items")
    .select("*")
    .eq("order_id", order.id);

  return NextResponse.json({ order, items: items || [] });
}
