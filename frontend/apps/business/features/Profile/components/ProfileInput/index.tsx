"use client";

import BaseBox from "@repo/ui/BaseBox/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchShowProfileQuery, useUpdateProfileMutation } from "../../queries/profileQueries";
import { ProfileUpdateInput, ProfileUpdateResponse, ProfileUpdateValidationError } from "@/apis/model";
import BaseControlFormImage from "@repo/ui/BaseControlFormImage/index";
import { useQueryClient } from "@tanstack/react-query";
import { getGetProfileQueryKey } from "@/apis/profile/profile";

const INITIAL_VALIDATION_ERRORS: ProfileUpdateValidationError = {};

const ProfileInput: FC = () => {
  const [validationErrors, setValidationErrors] = useState<ProfileUpdateValidationError>(INITIAL_VALIDATION_ERRORS);

  const { data, isLoading } = fetchShowProfileQuery().use({
    staleTime: 60 * 1000,
  });

  const { control, handleSubmit, setValue, watch } = useForm<ProfileUpdateInput>({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      address: data?.address ?? "",
      siteUrl: data?.siteUrl ?? "",
      employeeCount: data?.employeeCount,
      industryId: data?.industryId,
    },
  });

  const queryClient = useQueryClient();
  const onMutate = () => setValidationErrors(INITIAL_VALIDATION_ERRORS);
  const onSuccess = (result: ProfileUpdateResponse) => {
    if (Object.keys(result.errors).length > 0) {
      setValidationErrors(result.errors);
      return;
    }

    queryClient.invalidateQueries({ queryKey: getGetProfileQueryKey() });
    window.alert("プロフィールを更新しました。");
  };
  const mutation = useUpdateProfileMutation(onMutate, onSuccess);

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  useEffect(() => {
    if (!data?.logoUrl) return;

    const fetchLogo = async () => {
      const res = await fetch(data.logoUrl ?? "");
      const blob = await res.blob();
      const file = new File([blob], "logo.jpg", { type: blob.type });
      setValue("logo", file);
    };

    fetchLogo();
  }, [data?.logoUrl, setValue]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={onSubmit}>
          <BaseBox>
            <BaseControlFormInput id="name" label="会社名" control={control} name="name" type="text" validationErrors={validationErrors.name ?? []} />
          </BaseBox>

          <BaseBox>
            <BaseControlFormImage
              id="logo"
              label="ロゴ"
              control={control}
              name="logo"
              setValue={setValue}
              watch={watch}
              validationErrors={validationErrors.logo ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput
              id="email"
              label="メールアドレス"
              control={control}
              name="email"
              type="email"
              validationErrors={validationErrors.email ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput
              id="address"
              label="所在地"
              control={control}
              name="address"
              type="text"
              validationErrors={validationErrors.address ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput
              id="siteUrl"
              label="サイトURL"
              control={control}
              name="siteUrl"
              type="text"
              validationErrors={validationErrors.siteUrl ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput
              id="employeeCount"
              label="従業員数"
              control={control}
              name="employeeCount"
              type="number"
              validationErrors={validationErrors.employeeCount ?? []}
            />
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

export default ProfileInput;
