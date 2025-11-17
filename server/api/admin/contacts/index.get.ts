import type { Contact } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();

    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Contact[],
    };
  } catch (error: any) {
    console.error("[API] Error in contacts endpoint:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error",
    });
  }
});

