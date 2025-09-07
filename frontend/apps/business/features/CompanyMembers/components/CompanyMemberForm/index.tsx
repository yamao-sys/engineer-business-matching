"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import BaseBox from "@repo/ui/BaseBox/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseControlFormTextarea from "@repo/ui/BaseControlFormTextarea/index";
import BaseControlFormImage from "@repo/ui/BaseControlFormImage/index";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import { useCreateCompanyMemberMutation, useUpdateCompanyMemberMutation } from "../../queries/companyMemberQueries";
import { getGetCompanyMembersQueryKey } from "@/apis/company-member/company-member";
import type { CompanyMember, CompanyMemberUpdateInput, CompanyMemberUpdateResponse, CompanyMemberUpdateValidationError } from "@/apis/model";

type Props = {
  member: CompanyMember;
  isNewMember: boolean;
  onSuccess: () => void;
};

const INITIAL_VALIDATION_ERRORS: CompanyMemberUpdateValidationError = {};

const CompanyMemberForm: FC<Props> = ({ member, isNewMember, onSuccess }) => {
  const [validationErrors, setValidationErrors] = useState<CompanyMemberUpdateValidationError>(INITIAL_VALIDATION_ERRORS);

  const { control, handleSubmit, setValue, watch } = useForm<CompanyMemberUpdateInput>({
    defaultValues: {
      name: member?.name ?? "",
      position: member?.position ?? "",
      description: member?.description ?? "",
    },
  });

  const queryClient = useQueryClient();

  const onMutate = useCallback(() => setValidationErrors(INITIAL_VALIDATION_ERRORS), [setValidationErrors]);
  const onSuccessCreate = useCallback(
    async (result: CompanyMemberUpdateResponse) => {
      if (Object.keys(result.errors).length > 0) {
        setValidationErrors(result.errors);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: getGetCompanyMembersQueryKey() });
      window.alert("メンバーを追加しました。");
      onSuccess();
    },
    [setValidationErrors, queryClient, onSuccess],
  );
  const onSuccessUpdate = useCallback(
    async (result: CompanyMemberUpdateResponse) => {
      if (Object.keys(result.errors).length > 0) {
        setValidationErrors(result.errors);
        return;
      }

      await queryClient.invalidateQueries({ queryKey: getGetCompanyMembersQueryKey() });
      window.alert("メンバーを更新しました。");
      onSuccess();
    },
    [setValidationErrors, queryClient, onSuccess],
  );

  const createMutation = useCreateCompanyMemberMutation(onMutate, onSuccessCreate);
  const updateMutation = useUpdateCompanyMemberMutation(onMutate, onSuccessUpdate);

  const onSubmit = handleSubmit((data) => {
    const input: CompanyMemberUpdateInput = {
      name: data.name,
      position: data.position,
      description: data.description,
      icon: data.icon,
    };

    if (member && !isNewMember) {
      updateMutation.mutate({ id: member.id, input });
    } else {
      createMutation.mutate(input);
    }
  });

  useEffect(() => {
    if (!member?.iconUrl) return;

    const fetchIcon = async () => {
      const res = await fetch(member?.iconUrl ?? "");
      const blob = await res.blob();
      const file = new File([blob], "icon.jpg", { type: blob.type });
      setValue("icon", file);
    };

    fetchIcon();
  }, [member, setValue]);

  const isPending = useMemo(() => createMutation.isPending || updateMutation.isPending, [createMutation.isPending, updateMutation.isPending]);

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <BaseBox>
          <BaseControlFormInput id="name" label="表示名" control={control} name="name" type="text" validationErrors={validationErrors.name ?? []} />
        </BaseBox>

        <BaseBox>
          <BaseControlFormInput
            id="position"
            label="ポジション"
            control={control}
            name="position"
            type="text"
            validationErrors={validationErrors.position ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormTextarea
            id="description"
            label="概要"
            control={control}
            name="description"
            rows={3}
            validationErrors={validationErrors.description ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormImage
            id="icon"
            label="アイコン"
            control={control}
            name="icon"
            setValue={setValue}
            watch={watch}
            validationErrors={validationErrors.icon ?? []}
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

export default CompanyMemberForm;
