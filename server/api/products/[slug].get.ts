import type { Product } from "~/types";
import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const slug = getRouterParam(event, "slug");

    if (!slug) {
      throw createError({
        statusCode: 400,
        message: "Slug is required",
      });
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("status", "active")
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError({
          statusCode: 404,
          message: "Product not found",
        });
      }
      throw error;
    }

    return {
      status: 200,
      success: true,
      data: data as Product,
    };
  } catch (error: any) {
    console.error("[API] Error in product detail endpoint:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

