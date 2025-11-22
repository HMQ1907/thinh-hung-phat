import type { Contact, APIResponse } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const id = getRouterParam(event, "id");
    const body = await readBody(event);

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Contact ID is required",
      });
    }

    if (!body.status) {
      throw createError({
        statusCode: 400,
        message: "Status is required",
      });
    }

    const { data, error } = await supabase
      .from("contacts")
      .update({
        status: body.status,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      status: 200,
      success: true,
      data: data as Contact,
    } as APIResponse<Contact>;
  } catch (error: any) {
    console.error("[API] Error updating contact:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

