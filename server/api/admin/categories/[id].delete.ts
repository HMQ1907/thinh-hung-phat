import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Category ID is required",
      });
    }

    const supabase = serverSupabaseServiceClient();
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) throw error;

    return {
      status: 200,
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error: any) {
    console.error("[API] Error deleting category:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

