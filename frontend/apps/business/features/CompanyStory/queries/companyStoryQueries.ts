import { getGetCompanyStoryQueryKey } from "@/apis/company-story/company-story";
import { createQueryFactory } from "../../../../../libs/queryFactory";
import { showCompanyStory, updateCompanyStory } from "../actions/companyStory";
import { CompanyStoryUpdateInput, CompanyStoryUpdateResponse } from "@/apis/model";
import { useMutation } from "@tanstack/react-query";

export const fetchShowCompanyStoryQuery = createQueryFactory(
  () => [getGetCompanyStoryQueryKey()],
  async () => showCompanyStory(),
);

export const useUpdateCompanyStoryMutation = (onMutate: () => void, onSuccess: (result: CompanyStoryUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: CompanyStoryUpdateInput) => updateCompanyStory(input),
    onSuccess,
  });
