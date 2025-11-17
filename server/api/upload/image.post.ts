import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event);
    const file = formData.get("file") as File;

    if (!file) {
      throw createError({
        statusCode: 400,
        message: "No file provided",
      });
    }

    const supabase = serverSupabaseServiceClient();
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `uploads/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabase.storage
      .from("THP_Images")
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("THP_Images").getPublicUrl(data.path);

    return {
      status: 200,
      success: true,
      data: {
        url: publicUrl,
        path: data.path,
      },
    };
  } catch (error: any) {
    console.error("[API] Error uploading image:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to upload image",
    });
  }
});
