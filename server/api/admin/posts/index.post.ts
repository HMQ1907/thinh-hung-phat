import type { Post } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.title || !body.slug || !body.content) {
      throw createError({
        statusCode: 400,
        message: "Title, slug, and content are required",
      });
    }

    const supabase = serverSupabaseServiceClient();

    const { data, error } = await supabase
      .from("posts")
      .insert({
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt || null,
        thumbnail: body.thumbnail || null,
        status: body.status || "draft",
        category_id: body.category_id || null,
        featured: body.featured || false,
        author_id: null, // TODO: Get from auth
      })
      .select()
      .single();

    if (error) throw error;

    return {
      status: 201,
      success: true,
      data: data as Post,
    };
  } catch (error: any) {
    console.error("[API] Error creating post:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

