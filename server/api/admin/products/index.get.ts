import type { Product, APIResponse } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async () => {
  try {
    const supabase = serverSupabaseServiceClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Product[],
    } as APIResponse<Product[]>;
  } catch (error: any) {
    console.error("[API] Error listing products:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

