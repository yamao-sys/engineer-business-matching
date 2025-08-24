"use client";

import BaseBox from "@repo/ui/BaseBox/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchShowProfileQuery, useUpdateProfileMutation } from "../../queries/profileQueries";
import { ProfileUpdateInput, ProfileUpdateResponse, ProfileUpdateValidationError } from "@/apis/model";
import { useQueryClient } from "@tanstack/react-query";
import { getGetProfileQueryKey } from "@/apis/profile/profile";

const INITIAL_VALIDATION_ERRORS: ProfileUpdateValidationError = {};

const ProfileInput: FC = () => {
  const [validationErrors, setValidationErrors] = useState<ProfileUpdateValidationError>(INITIAL_VALIDATION_ERRORS);

  const { data, isLoading } = fetchShowProfileQuery().use();

  const { control, handleSubmit } = useForm<ProfileUpdateInput>({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      birthday: data?.birthday,
      address: data?.address ?? "",
      currentEmployer: data?.currentEmployer ?? "",
      tel: data?.tel ?? "",
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

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={onSubmit}>
          <BaseBox additionalClassName="flex justify-between">
            <div className="w-9/20">
              <BaseControlFormInput id="last-name" label="姓" control={control} name="lastName" validationErrors={validationErrors.lastName ?? []} />
            </div>
            <div className="w-9/20">
              <BaseControlFormInput
                id="first-name"
                label="名"
                control={control}
                name="firstName"
                validationErrors={validationErrors.firstName ?? []}
              />
            </div>
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput
              id="birthday"
              label="生年月日"
              control={control}
              name="birthday"
              type="date"
              validationErrors={validationErrors.birthday ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput
              id="address"
              label="居住地"
              control={control}
              name="address"
              type="text"
              validationErrors={validationErrors.address ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput
              id="current-employer"
              label="現在の雇用先"
              control={control}
              name="currentEmployer"
              type="text"
              validationErrors={validationErrors.currentEmployer ?? []}
            />
          </BaseBox>

          <BaseBox>
            <BaseControlFormInput id="tel" label="電話番号" control={control} name="tel" type="text" validationErrors={validationErrors.tel ?? []} />
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
