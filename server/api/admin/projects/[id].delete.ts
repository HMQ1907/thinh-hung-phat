import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Project ID is required",
      });
    }

    const supabase = serverSupabaseServiceClient();
    
    // Get project to find thumbnail path
    const { data: project, error: fetchError } = await supabase
      .from("projects")
      .select("thumbnail")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Delete image from storage if exists
    if (project?.thumbnail) {
      try {
        // Extract path from URL (format: https://xxx.supabase.co/storage/v1/object/public/THP_Images/uploads/xxx.jpg)
        const url = new URL(project.thumbnail);
        const pathParts = url.pathname.split('/');
        const thpImagesIndex = pathParts.findIndex(part => part === 'THP_Images');
        
        if (thpImagesIndex !== -1 && thpImagesIndex < pathParts.length - 1) {
          const storagePath = pathParts.slice(thpImagesIndex + 1).join('/');
          
          if (storagePath) {
            await supabase.storage
              .from("THP_Images")
              .remove([storagePath]);
          }
        }
      } catch (storageError) {
        console.warn("[API] Failed to delete image from storage:", storageError);
        // Continue with deletion even if image removal fails
      }
    }

    // Delete project from database
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


