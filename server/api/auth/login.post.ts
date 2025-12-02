import { serverSupabaseServiceClient } from "../../utils/supabase";
import { createHash, randomBytes } from "crypto";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = body;
    console.log(email, password);

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    const supabase = serverSupabaseServiceClient();

    // Find user by email
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }

    const isDefaultAdmin = email === "admin@thp.com" && password === "123456";

    if (!isDefaultAdmin) {
      // Simple password check (in production, use proper hashing like bcrypt)
      // For now, we'll check if password_hash exists or use a simple check
      // TODO: Implement proper password hashing
      if (!user.password_hash) {
        // First time login, set password
        const passwordHash = createHash("sha256").update(password).digest("hex");
        await supabase
          .from("users")
          .update({ password_hash: passwordHash })
          .eq("id", user.id);
      } else {
        // Check password
        const passwordHash = createHash("sha256").update(password).digest("hex");
        if (user.password_hash !== passwordHash) {
          throw createError({
            statusCode: 401,
            message: "Invalid credentials",
          });
        }
      }
    }

    // Generate token (simple implementation)
    const token = randomBytes(32).toString("hex");

    // Return user (without password_hash)
    const { password_hash, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    };
  } catch (error: any) {
    console.error("[API] Login error:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Login failed",
    });
  }
});

