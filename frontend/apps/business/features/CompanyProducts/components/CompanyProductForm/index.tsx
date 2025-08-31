"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import BaseBox from "@repo/ui/BaseBox/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseControlFormTextarea from "@repo/ui/BaseControlFormTextarea/index";
import BaseControlFormImage from "@repo/ui/BaseControlFormImage/index";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import { useCreateCompanyProductMutation, useUpdateCompanyProductMutation } from "../../queries/companyProductQueries";
import { getGetCompanyProductsQueryKey } from "@/apis/company-product/company-product";
import type { CompanyProduct, CompanyProductUpdateInput, CompanyProductUpdateResponse, CompanyProductUpdateValidationError } from "@/apis/model";

type Props = {
  product: CompanyProduct;
  isNewProduct: boolean;
  onSuccess: () => void;
};

const INITIAL_VALIDATION_ERRORS: CompanyProductUpdateValidationError = {};

const CompanyProductForm: FC<Props> = ({ product, isNewProduct, onSuccess }) => {
  const [validationErrors, setValidationErrors] = useState<CompanyProductUpdateValidationError>(INITIAL_VALIDATION_ERRORS);

  const { control, handleSubmit, setValue, watch } = useForm<CompanyProductUpdateInput>({
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      url: product?.url ?? "",
    },
  });

  const queryClient = useQueryClient();

  const onMutate = () => setValidationErrors(INITIAL_VALIDATION_ERRORS);
  const onSuccessCreate = async (result: CompanyProductUpdateResponse) => {
    if (Object.keys(result.errors).length > 0) {
      setValidationErrors(result.errors);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: getGetCompanyProductsQueryKey() });
    window.alert("プロダクトを追加しました。");
    onSuccess();
  };
  const onSuccessUpdate = async (result: CompanyProductUpdateResponse) => {
    if (Object.keys(result.errors).length > 0) {
      setValidationErrors(result.errors);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: getGetCompanyProductsQueryKey() });
    window.alert("プロダクトを更新しました。");
    onSuccess();
  };

  const createMutation = useCreateCompanyProductMutation(onMutate, onSuccessCreate);
  const updateMutation = useUpdateCompanyProductMutation(onMutate, onSuccessUpdate);

  const onSubmit = handleSubmit((data) => {
    const input: CompanyProductUpdateInput = {
      name: data.name,
      description: data.description,
      url: data.url,
      logo: data.logo,
    };

    if (product && !isNewProduct) {
      updateMutation.mutate({ id: product.id, input });
    } else {
      createMutation.mutate(input);
    }
  });

  useEffect(() => {
    if (!product?.logoUrl) return;

    const fetchLogo = async () => {
      const res = await fetch(product?.logoUrl ?? "");
      const blob = await res.blob();
      const file = new File([blob], "logo.jpg", { type: blob.type });
      setValue("logo", file);
    };

    fetchLogo();
  }, [product, setValue]);

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
        <BaseBox>
          <BaseControlFormInput
            id="name"
            label="プロダクト名"
            control={control}
            name="name"
            type="text"
            validationErrors={validationErrors.name ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormTextarea
            id="description"
            label="説明"
            control={control}
            name="description"
            rows={3}
            validationErrors={validationErrors.description ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormInput id="url" label="URL" control={control} name="url" type="url" validationErrors={validationErrors.url ?? []} />
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

        <BaseFlexCentralBox>
          <BaseButton
            disabled={isPending}
            borderColor="border-blue-500"
            bgColor="bg-blue-500"
            label={isPending ? "送信中..." : "登録する"}
            type="submit"
          />
        </BaseFlexCentralBox>
      </form>
    </>
  );
};

export default CompanyProductForm;
