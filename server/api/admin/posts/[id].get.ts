import type { Post } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "ID is required",
      });
    }

    const { data, error } = await supabase
      .from("posts")
      .select("*, category:categories(*), author:users(*)")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw createError({
          statusCode: 404,
          message: "Post not found",
        });
      }
      throw error;
    }

    return {
      status: 200,
      success: true,
      data: data as Post,
    };
  } catch (error: any) {
    console.error("[API] Error in post detail endpoint:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

