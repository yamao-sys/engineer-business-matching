"use client";

import BaseBox from "@repo/ui/BaseBox/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import BaseControlFormTextarea from "@repo/ui/BaseControlFormTextarea/index";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchShowCompanyStoryQuery, useUpdateCompanyStoryMutation } from "../../queries/companyStoryQueries";
import { CompanyStoryUpdateInput, CompanyStoryUpdateResponse, CompanyStoryUpdateValidationError } from "@/apis/model";
import { useQueryClient } from "@tanstack/react-query";
import { getGetCompanyStoryQueryKey } from "@/apis/company-story/company-story";

const INITIAL_VALIDATION_ERRORS: CompanyStoryUpdateValidationError = {};

const CompanyStoryInput: FC = () => {
  const [validationErrors, setValidationErrors] = useState<CompanyStoryUpdateValidationError>(INITIAL_VALIDATION_ERRORS);

  const { data, isLoading } = fetchShowCompanyStoryQuery().use({
    staleTime: 60 * 1000,
  });

  const { control, handleSubmit } = useForm<CompanyStoryUpdateInput>({
    defaultValues: {
      mission: data?.mission ?? "",
      vision: data?.vision ?? "",
    },
  });

  const queryClient = useQueryClient();
  const onMutate = () => setValidationErrors(INITIAL_VALIDATION_ERRORS);
  const onSuccess = (result: CompanyStoryUpdateResponse) => {
    if (Object.keys(result.errors).length > 0) {
      setValidationErrors(result.errors);
      return;
    }

    queryClient.invalidateQueries({ queryKey: getGetCompanyStoryQueryKey() });
    window.alert("企業ストーリーを更新しました。");
  };
  const mutation = useUpdateCompanyStoryMutation(onMutate, onSuccess);

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={onSubmit}>
          <BaseBox>
            <BaseControlFormTextarea
              id="mission"
              label="ミッション"
              control={control}
              name="mission"
              validationErrors={validationErrors.mission ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormTextarea id="vision" label="ビジョン" control={control} name="vision" validationErrors={validationErrors.vision ?? []} />
          </BaseBox>

          <BaseBox>
            <BaseFlexCentralBox>
              <BaseButton
                disabled={mutation.isPending}
                borderColor="border-green-500"
                bgColor="bg-green-500"
                label={mutation.isPending ? "送信中..." : "更新する"}
                type="submit"
              />
            </BaseFlexCentralBox>
          </BaseBox>
        </form>
      )}
    </>
  );
};

export default CompanyStoryInput;
