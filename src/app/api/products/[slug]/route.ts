import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const { data: product, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("active", true)
    .single();

  if (error || !product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const { data: sizes } = await supabaseAdmin
    .from("product_sizes")
    .select("*")
    .eq("product_id", product.id);

  return NextResponse.json({ product, sizes: sizes || [] });
}
