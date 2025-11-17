import type { Post, APIResponse } from "~/types";

export const usePosts = async () => {
  const { data, error } = await useFetch<APIResponse<Post[]>>("/api/posts");
  if (error.value) {
    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
  return data.value?.data;
};
