import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");

  let query = supabaseAdmin
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  if (tag && tag !== "All") {
    query = query.contains("tags", [tag]);
  }

  const { data: products, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: sizes } = await supabaseAdmin
    .from("product_sizes")
    .select("*");

  return NextResponse.json({ products, sizes: sizes || [] });
}
