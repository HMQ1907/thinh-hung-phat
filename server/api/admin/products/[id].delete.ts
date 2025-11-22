import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Product ID is required",
      });
    }

    const supabase = serverSupabaseServiceClient();
    
    // Get product to find image path
    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // Delete image from storage if exists
    if (product?.image_url) {
      try {
        const url = new URL(product.image_url);
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
      }
    }

    // Delete product from database
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;

    return {
      status: 200,
      success: true,
      message: "Product deleted successfully",
    };
  } catch (error: any) {
    console.error("[API] Error deleting product:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

