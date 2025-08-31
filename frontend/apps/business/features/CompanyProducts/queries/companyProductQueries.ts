import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGetCompanyProductsQueryKey } from "@/apis/company-product/company-product";
import { createQueryFactory } from "../../../../../libs/queryFactory";
import { fetchCompanyProducts, createCompanyProduct, updateCompanyProduct, removeCompanyProduct } from "../actions/companyProducts";
import type { CompanyProductUpdateInput, CompanyProductUpdateResponse } from "@/apis/model";

export const fetchCompanyProductsQuery = createQueryFactory(
  () => getGetCompanyProductsQueryKey(),
  async () => fetchCompanyProducts(),
);

export const useCreateCompanyProductMutation = (onMutate?: () => void, onSuccess?: (result: CompanyProductUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: CompanyProductUpdateInput) => createCompanyProduct(input),
    onSuccess,
  });

export const useUpdateCompanyProductMutation = (onMutate?: () => void, onSuccess?: (result: CompanyProductUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async ({ id, input }: { id: string; input: CompanyProductUpdateInput }) => updateCompanyProduct(id, input),
    onSuccess,
  });

export const useDeleteCompanyProductMutation = (onMutate?: () => void, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate,
    mutationFn: async (id: string) => removeCompanyProduct(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: getGetCompanyProductsQueryKey() });
      onSuccess?.();
    },
  });
};
