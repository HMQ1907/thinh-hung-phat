import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Project ID is required",
      });
    }

    const supabase = serverSupabaseServiceClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw error;

    return {
      status: 200,
      success: true,
      message: "Project deleted",
    };
  } catch (error: any) {
    console.error("[API] Error deleting project:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});


