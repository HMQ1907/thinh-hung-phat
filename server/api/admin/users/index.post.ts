import type { User } from "~/types";
import { serverSupabaseServiceClient } from "../../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.email || !body.name || !body.password) {
      throw createError({
        statusCode: 400,
        message: "Name, email and password are required",
      });
    }

    const supabase = serverSupabaseServiceClient();

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: body.email,
      password: body.password,
      email_confirm: true,
      user_metadata: {
        name: body.name,
        role: body.role || "user",
      },
    });

    if (authError) throw authError;

    // Insert user into users table
    if (authData.user) {
      const { data: userData, error: dbError } = await supabase
        .from("users")
        .insert({
          id: authData.user.id,
          name: body.name,
          email: body.email,
          role: body.role || "user",
        })
        .select()
        .single();

      if (dbError) {
        // Rollback: delete auth user if database insert fails
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw dbError;
      }

      return {
        status: 201,
        success: true,
        data: userData as User,
      };
    }

    throw createError({
      statusCode: 500,
      message: "Failed to create user",
    });
  } catch (error: any) {
    console.error("[API] Error creating user:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});

    
    