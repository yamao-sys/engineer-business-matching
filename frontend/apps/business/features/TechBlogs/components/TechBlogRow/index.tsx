"use client";

import { TechBlog } from "@/apis/model";
import { FC, useCallback, useState } from "react";
import BaseBox from "@repo/ui/BaseBox/index";
import BaseButton from "@repo/ui/BaseButton/index";
import TechBlogModal from "../TechBlogModal";
import { UseMutationResult } from "@tanstack/react-query";
import { getDateString } from "../../../../../../libs/date";

type Props = {
  techBlog: TechBlog;
  deleteMutation: UseMutationResult<void, Error, string, void>;
};

const TechBlogRow: FC<Props> = ({ techBlog, deleteMutation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditTechBlog = useCallback(() => setIsModalOpen(true), []);

  const handleDeleteTechBlog = useCallback(
    (techBlog: TechBlog) => {
      if (!confirm(`「${techBlog.title}」を削除しますか？`)) {
        return;
      }
      deleteMutation.mutate(techBlog.id);
    },
    [deleteMutation],
  );

  const formatDate = useCallback((date: Date) => getDateString(date), []);

  return (
    <BaseBox>
      <div className="flex items-start justify-between rounded-lg border border-gray-200 p-4">
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{techBlog.title}</h3>
            <div className="space-y-1">
              <div className="text-sm text-gray-600">
                <span className="font-medium">URL:</span>{" "}
                <a href={techBlog.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {techBlog.url}
                </a>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">公開日:</span> {formatDate(new Date(techBlog.publishedAt))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-x-2 ml-6">
          <BaseButton borderColor="border-green-500" bgColor="bg-green-500" label="編集する" onClick={handleEditTechBlog} />
          <BaseButton
            borderColor="border-red-500"
            bgColor="bg-red-500"
            label={deleteMutation.isPending ? "削除中..." : "削除する"}
            onClick={() => handleDeleteTechBlog(techBlog)}
            disabled={deleteMutation.isPending}
          />
        </div>
      </div>

      {isModalOpen && <TechBlogModal onClose={() => setIsModalOpen(false)} techBlog={techBlog} isNewTechBlog={false} />}
    </BaseBox>
  );
};

export default TechBlogRow;
