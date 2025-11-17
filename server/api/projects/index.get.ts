import type { Project } from "~/types";
import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const query = getQuery(event);
    const limit = query.limit ? Number(query.limit) : 20;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("status", "active")
      .order("completed_at", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Project[],
    };
  } catch (error: any) {
    console.error("[API] Error fetching projects:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});


