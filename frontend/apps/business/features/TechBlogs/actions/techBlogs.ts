"use server";

import { cookies } from "next/headers";
import { deleteTechBlog, getTechBlog, getTechBlogs, postTechBlog, putTechBlog } from "@/apis/tech-blog/tech-blog";
import type { TechBlog, TechBlogUpdateInput, TechBlogUpdateResponse } from "@/apis/model";

export const fetchTechBlogs = async (): Promise<TechBlog[]> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await getTechBlogs({
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    default:
      console.error("Failed to show tech blogs", res.data);
      throw new Error("Failed to show tech blogs", { cause: res.data });
  }
};

export const showTechBlog = async (id: string): Promise<TechBlog> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await getTechBlog(id, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    default:
      console.error("Failed to show tech blog", res.data);
      throw new Error("Failed to show tech blog", { cause: res.data });
  }
};

export const createTechBlog = async (input: TechBlogUpdateInput): Promise<TechBlogUpdateResponse> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await postTechBlog(input, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    case 400:
      return res.data;
    default:
      console.error("Failed to create tech blog", res.data);
      throw new Error("Failed to create tech blog", { cause: res.data });
  }
};

export const updateTechBlog = async (id: string, input: TechBlogUpdateInput): Promise<TechBlogUpdateResponse> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await putTechBlog(id, input, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    case 400:
      return res.data;
    case 404:
      console.error("Tech blog not found", res.data);
      throw new Error("Tech blog not found", { cause: res.data });
    default:
      console.error("Failed to update tech blog", res.data);
      throw new Error("Failed to update tech blog", { cause: res.data });
  }
};

export const removeTechBlog = async (id: string): Promise<void> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await deleteTechBlog(id, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return;
    case 404:
      console.error("Tech blog not found", res.data);
      throw new Error("Tech blog not found", { cause: res.data });
    default:
      console.error("Failed to delete tech blog", res.data);
      throw new Error("Failed to delete tech blog", { cause: res.data });
  }
};
