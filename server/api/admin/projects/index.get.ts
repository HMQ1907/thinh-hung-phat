import type { Project } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async () => {
  try {
    const supabase = serverSupabaseServiceClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Project[],
    };
  } catch (error: any) {
    console.error("[API] Error listing projects:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});


