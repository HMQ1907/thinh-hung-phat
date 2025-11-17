import type { Post } from "~/types";
import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const query = getQuery(event);
    const limit = query.limit ? Number(query.limit) : 10;
    const status = query.status as string | undefined;

    let queryBuilder = supabase
      .from("posts")
      .select("*, category:categories(*), author:users(*)");

    if (status) {
      queryBuilder = queryBuilder.eq("status", status);
    }

    queryBuilder = queryBuilder.limit(limit).order("created_at", { ascending: false });

    const { data, error } = await queryBuilder;

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Post[],
    };
  } catch (error: any) {
    console.error("[API] Error in posts endpoint:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
});
