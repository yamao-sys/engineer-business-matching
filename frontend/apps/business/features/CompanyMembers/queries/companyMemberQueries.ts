import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGetCompanyMembersQueryKey } from "@/apis/company-member/company-member";
import { createQueryFactory } from "../../../../../libs/queryFactory";
import { fetchCompanyMembers, createCompanyMember, updateCompanyMember, removeCompanyMember } from "../actions/companyMembers";
import type { CompanyMemberUpdateInput, CompanyMemberUpdateResponse } from "@/apis/model";

export const fetchCompanyMembersQuery = createQueryFactory(
  () => getGetCompanyMembersQueryKey(),
  async () => fetchCompanyMembers(),
);

export const useCreateCompanyMemberMutation = (onMutate?: () => void, onSuccess?: (result: CompanyMemberUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: CompanyMemberUpdateInput) => createCompanyMember(input),
    onSuccess,
  });

export const useUpdateCompanyMemberMutation = (onMutate?: () => void, onSuccess?: (result: CompanyMemberUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async ({ id, input }: { id: string; input: CompanyMemberUpdateInput }) => updateCompanyMember(id, input),
    onSuccess,
  });

export const useDeleteCompanyMemberMutation = (onMutate?: () => void, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate,
    mutationFn: async (id: string) => removeCompanyMember(id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: getGetCompanyMembersQueryKey() });
      onSuccess?.();
    },
  });
};
