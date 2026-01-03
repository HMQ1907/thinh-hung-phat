import type { Post, APIResponse } from "~/types";
import { serverSupabaseServiceClient } from "../../utils/supabase";

export default defineEventHandler(async (event) => {
  try {
    const supabase = serverSupabaseServiceClient();
    const query = getQuery(event);
    const limit = query.limit ? Number(query.limit) : 50; // Increased limit
    const status = query.status as string | undefined;

    console.log("[API] Posts request - status filter:", status, "limit:", limit);

    let queryBuilder = supabase
      .from("posts")
      .select("*, category:categories(*), author:users(*)");

    const finalStatus = status || "published";
    queryBuilder = queryBuilder.eq("status", finalStatus);

    queryBuilder = queryBuilder
      .limit(limit)
      .order("updated_at", { ascending: false })
      .order("created_at", { ascending: false });

    const { data, error } = await queryBuilder;

    if (error) {
      console.error("[API] Posts query error:", error);
      throw error;
    }

    console.log("[API] Posts fetched from DB:", data?.length || 0, "posts");
    if (data && data.length > 0) {
      console.log("[API] All posts from DB:", data.map((p: any) => ({ 
        id: p.id, 
        title: p.title?.substring(0, 50) || "NO TITLE", 
        status: p.status, 
        slug: p.slug || "NO SLUG",
        hasSlug: !!(p.slug && p.slug.trim() !== "")
      })));
    }

    // Generate slug for posts without slug, or filter them out
    const validPosts = (data || []).map((post: any) => {
      if (!post.slug || post.slug.trim() === "") {
        // Generate slug from title if missing
        if (post.title) {
          const generatedSlug = post.title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
          console.log("[API] Generated slug for post:", { id: post.id, title: post.title?.substring(0, 50), generatedSlug });
          return { ...post, slug: generatedSlug };
        } else {
          console.log("[API] Filtered out post (no slug and no title):", { id: post.id });
          return null;
        }
      }
      return post;
    }).filter((post: any) => post !== null);

    console.log("[API] Valid posts (with slug):", validPosts.length, "posts");
    if (validPosts.length > 0) {
      console.log("[API] All valid posts:", validPosts.map((p: any) => ({ id: p.id, title: p.title?.substring(0, 50), status: p.status, slug: p.slug })));
    }
    
    if (data && data.length > validPosts.length) {
      console.log("[API] WARNING:", data.length - validPosts.length, "post(s) were filtered out due to missing slug");
    }

    return {
      status: 200,
      success: true,
      data: validPosts as Post[],
    } as APIResponse<Post[]>;
  } catch (error: any) {
    console.error("[API] Error in posts endpoint:", error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Internal server error",
    });
  }
});
