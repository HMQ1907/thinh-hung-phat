import type { Project } from "~/types";
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

    const body = await readBody(event);
    const supabase = serverSupabaseServiceClient();

    const { data, error } = await supabase
      .from("projects")
      .update({
        name: body.name,
        slug: body.slug,
        description: body.description,
        location: body.location,
        thumbnail: body.thumbnail,
        gallery: body.gallery,
        status: body.status,
        completed_at: body.completed_at || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Project,
    };
  } catch (error: any) {
    console.error("[API] Error updating project:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});


