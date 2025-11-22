import type { Category, APIResponse } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Category ID is required",
      });
    }

    if (!body.name || !body.slug) {
      throw createError({
        statusCode: 400,
        message: "Name and slug are required",
      });
    }

    const supabase = serverSupabaseServiceClient();

    const { data, error } = await supabase
      .from("categories")
      .update({
        name: body.name,
        slug: body.slug,
        description: body.description || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Category,
    } as APIResponse<Category>;
  } catch (error: any) {
    console.error("[API] Error updating category:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

