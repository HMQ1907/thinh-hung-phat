import type { Post, APIResponse } from "~/types";
import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const query = getQuery(event);
    const limit = query.limit ? Number(query.limit) : 50; // Increased limit
    const status = query.status as string | undefined;

    console.log("[API] Posts request - status filter:", status, "limit:", limit);

    let queryBuilder = supabase
      .from("posts")
      .select("*, category:categories(*), author:users(*)");

    // Always filter by published for public API
    queryBuilder = queryBuilder.eq("status", "published");

    queryBuilder = queryBuilder
      .limit(limit)
      .order("created_at", { ascending: false });

    const { data, error } = await queryBuilder;

    if (error) {
      console.error("[API] Posts query error:", error);
      throw error;
    }

    console.log("[API] Posts fetched:", data?.length || 0, "posts");
    if (data && data.length > 0) {
      console.log("[API] First post:", { id: data[0].id, title: data[0].title, status: data[0].status });
    }

    return {
      status: 200,
      success: true,
      data: data as Post[],
    } as APIResponse<Post[]>;
  } catch (error: any) {
    console.error("[API] Error in posts endpoint:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
