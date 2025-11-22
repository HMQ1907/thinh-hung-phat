import { getCookie, defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  // Only protect admin routes
  if (!event.path.startsWith("/admin")) {
    return;
  }

  // Allow login page
  if (event.path === "/admin/login" || event.path === "/login") {
    return;
  }

  const token = getCookie(event, "auth-token");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  // Verify token (simplified - in production use proper JWT verification)
  // For now, just check if token exists
  // TODO: Implement proper token verification
});

