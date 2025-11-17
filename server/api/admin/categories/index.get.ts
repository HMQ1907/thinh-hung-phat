import type { Category } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Category[],
    };
  } catch (error: any) {
    console.error("[API] Error in categories endpoint:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
});

