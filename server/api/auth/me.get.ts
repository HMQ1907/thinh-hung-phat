import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, "auth-token");

    if (!token) {
      throw createError({
        statusCode: 401,
        message: "Not authenticated",
      });
    }

    // In a real app, verify token and get user from token
    // For now, we'll get user from a header or use a simple check
    // TODO: Implement proper JWT token verification

    // For demo, we'll just return the first admin user
    // In production, decode token and get user ID
    const supabase = serverSupabaseServiceClient();
    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, name, role, avatar_url, created_at, updated_at")
      .limit(1)
      .single();

    if (error || !users) {
      throw createError({
        statusCode: 401,
        message: "Not authenticated",
      });
    }

    return {
      success: true,
      data: users,
    };
  } catch (error: any) {
    console.error("[API] Auth check error:", error);
    throw createError({
      statusCode: error.statusCode || 401,
      message: error.message || "Not authenticated",
    });
  }
});

