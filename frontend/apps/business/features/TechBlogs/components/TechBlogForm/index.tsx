"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import BaseBox from "@repo/ui/BaseBox/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import { useCreateTechBlogMutation, useUpdateTechBlogMutation } from "../../queries/techBlogQueries";
import { getGetTechBlogsQueryKey } from "@/apis/tech-blog/tech-blog";
import type { TechBlog, TechBlogUpdateInput, TechBlogUpdateResponse, TechBlogUpdateValidationError } from "@/apis/model";

type Props = {
  techBlog: TechBlog;
  isNewTechBlog: boolean;
  onSuccess: () => void;
};

const INITIAL_VALIDATION_ERRORS: TechBlogUpdateValidationError = {};

const TechBlogForm: FC<Props> = ({ techBlog, isNewTechBlog, onSuccess }) => {
  const [validationErrors, setValidationErrors] = useState<TechBlogUpdateValidationError>(INITIAL_VALIDATION_ERRORS);

  const { control, handleSubmit } = useForm<TechBlogUpdateInput>({
    defaultValues: {
      title: techBlog?.title ?? "",
      url: techBlog?.url ?? "",
      publishedAt: techBlog?.publishedAt ?? "",
    },
  });

  const queryClient = useQueryClient();

  const onMutate = useCallback(() => setValidationErrors(INITIAL_VALIDATION_ERRORS), [setValidationErrors]);
  const onSuccessCreate = useCallback(
    async (result: TechBlogUpdateResponse) => {
      if (Object.keys(result.errors).length > 0) {
        setValidationErrors(result.errors);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: getGetTechBlogsQueryKey() });
      window.alert("技術ブログを追加しました。");
      onSuccess();
    },
    [setValidationErrors, queryClient, onSuccess],
  );
  const onSuccessUpdate = useCallback(
    async (result: TechBlogUpdateResponse) => {
      if (Object.keys(result.errors).length > 0) {
        setValidationErrors(result.errors);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: getGetTechBlogsQueryKey() });
      window.alert("技術ブログを更新しました。");
      onSuccess();
    },
    [setValidationErrors, queryClient, onSuccess],
  );

  const createMutation = useCreateTechBlogMutation(onMutate, onSuccessCreate);
  const updateMutation = useUpdateTechBlogMutation(onMutate, onSuccessUpdate);

  const onSubmit = handleSubmit((data) => {
    const input: TechBlogUpdateInput = {
      title: data.title,
      url: data.url,
      publishedAt: new Date(data.publishedAt),
    };

    if (techBlog && !isNewTechBlog) {
      updateMutation.mutate({ id: techBlog.id, input });
    } else {
      createMutation.mutate(input);
    }
  });

  const isPending = useMemo(() => createMutation.isPending || updateMutation.isPending, [createMutation.isPending, updateMutation.isPending]);

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <BaseBox>
          <BaseControlFormInput
            id="title"
            label="タイトル"
            control={control}
            name="title"
            type="text"
            validationErrors={validationErrors.title ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormInput id="url" label="URL" control={control} name="url" type="url" validationErrors={validationErrors.url ?? []} />
        </BaseBox>

        <BaseBox>
          <BaseControlFormInput
            id="published-at"
            label="公開日"
            control={control}
            name="publishedAt"
            type="date"
            validationErrors={validationErrors.publishedAt ?? []}
          />
        </BaseBox>

        <BaseFlexCentralBox>
          <BaseButton
            disabled={isPending}
            borderColor="border-blue-500"
            bgColor="bg-blue-500"
            label={isPending ? "送信中..." : "更新する"}
            type="submit"
          />
        </BaseFlexCentralBox>
      </form>
    </>
  );
};

export default TechBlogForm;
