import type { Contact } from "~/types";
import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.name || !body.email || !body.message) {
      throw createError({
        statusCode: 400,
        message: "Name, email, and message are required",
      });
    }

    const supabase = serverSupabaseServiceClient();

    const { data, error } = await supabase.from("contacts").insert({
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      message: body.message,
      status: "new",
    }).select().single();

    if (error) throw error;

    return {
      status: 201,
      success: true,
      data: data as Contact,
    };
  } catch (error: any) {
    console.error("[API] Error in contacts endpoint:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

