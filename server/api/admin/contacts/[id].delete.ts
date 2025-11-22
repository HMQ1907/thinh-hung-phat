import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Contact ID is required",
      });
    }

    const { error } = await supabase.from("contacts").delete().eq("id", id);

    if (error) throw error;

    return {
      status: 200,
      success: true,
      message: "Contact deleted successfully",
    };
  } catch (error: any) {
    console.error("[API] Error deleting contact:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

