import type { Category, APIResponse } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.name || !body.slug) {
      throw createError({
        statusCode: 400,
        message: "Name and slug are required",
      });
    }

    const supabase = serverSupabaseServiceClient();

    const { data, error } = await supabase
      .from("categories")
      .insert({
        name: body.name,
        slug: body.slug,
        description: body.description || null,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      status: 201,
      success: true,
      data: data as Category,
    } as APIResponse<Category>;
  } catch (error: any) {
    console.error("[API] Error creating category:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

