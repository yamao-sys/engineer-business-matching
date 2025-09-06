"use client";

import { FC, useCallback, useState } from "react";
import BaseButton from "@repo/ui/BaseButton/index";
import { fetchTechBlogsQuery, useDeleteTechBlogMutation } from "../../queries/techBlogQueries";
import TechBlogModal from "../TechBlogModal";
import type { TechBlog } from "@/apis/model";
import TechBlogRow from "../TechBlogRow";

const TechBlogsList: FC = () => {
  const { data: techBlogs, isLoading } = fetchTechBlogsQuery().use();

  const deleteMutation = useDeleteTechBlogMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAddTechBlog = useCallback(() => setIsCreateModalOpen(true), []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-6">
          <div className="text-right">
            <BaseButton borderColor="border-blue-500" bgColor="bg-blue-500" label="追加する" onClick={handleAddTechBlog} />
          </div>

          {isCreateModalOpen && <TechBlogModal onClose={() => setIsCreateModalOpen(false)} techBlog={{} as TechBlog} isNewTechBlog={true} />}

          {techBlogs && techBlogs.length > 0 ? (
            <div className="space-y-4">
              {techBlogs.map((techBlog: TechBlog) => (
                <TechBlogRow key={techBlog.id} techBlog={techBlog} deleteMutation={deleteMutation} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">技術ブログが登録されていません。</div>
          )}
        </div>
      )}
    </>
  );
};

export default TechBlogsList;
