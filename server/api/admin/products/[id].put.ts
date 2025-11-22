import type { Product, APIResponse } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Product ID is required",
      });
    }

    if (!body.name || !body.slug) {
      throw createError({
        statusCode: 400,
        message: "Name and slug are required",
      });
    }

    const supabase = serverSupabaseServiceClient();

    const updateData: any = {
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      specifications: body.specifications || null,
      price: body.price || null,
      image_url: body.image_url || null,
      status: body.status || "active",
      category_id: body.category_id || null,
    };

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Product,
    } as APIResponse<Product>;
  } catch (error: any) {
    console.error("[API] Error updating product:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

