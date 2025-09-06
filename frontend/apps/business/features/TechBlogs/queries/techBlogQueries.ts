import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGetTechBlogsQueryKey } from "@/apis/tech-blog/tech-blog";
import { createQueryFactory } from "../../../../../libs/queryFactory";
import { fetchTechBlogs, createTechBlog, updateTechBlog, removeTechBlog } from "../actions/techBlogs";
import type { TechBlogUpdateInput, TechBlogUpdateResponse } from "@/apis/model";

export const fetchTechBlogsQuery = createQueryFactory(
  () => getGetTechBlogsQueryKey(),
  async () => fetchTechBlogs(),
);

export const useCreateTechBlogMutation = (onMutate?: () => void, onSuccess?: (result: TechBlogUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: TechBlogUpdateInput) => createTechBlog(input),
    onSuccess,
  });

export const useUpdateTechBlogMutation = (onMutate?: () => void, onSuccess?: (result: TechBlogUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async ({ id, input }: { id: string; input: TechBlogUpdateInput }) => updateTechBlog(id, input),
    onSuccess,
  });

export const useDeleteTechBlogMutation = (onMutate?: () => void, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate,
    mutationFn: async (id: string) => removeTechBlog(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: getGetTechBlogsQueryKey() });
      onSuccess?.();
    },
  });
};
