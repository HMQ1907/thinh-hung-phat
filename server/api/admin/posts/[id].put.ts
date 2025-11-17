import type { Post } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID is required",
      });
    }

    const { data, error } = await supabase
      .from("posts")
      .update({
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt || null,
        thumbnail: body.thumbnail || null,
        status: body.status,
        category_id: body.category_id || null,
        featured: body.featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Post,
    };
  } catch (error: any) {
    console.error("[API] Error updating post:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

