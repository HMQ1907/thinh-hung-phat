import type { Post } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const query = getQuery(event);
    const limit = query.limit ? Number(query.limit) : 100;

    const { data, error } = await supabase
      .from("posts")
      .select("*, category:categories(*), author:users(*)")
      .limit(limit)
      .order("updated_at", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Post[],
    };
  } catch (error: any) {
    console.error("[API] Error in admin posts endpoint:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
});

