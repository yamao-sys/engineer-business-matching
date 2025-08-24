import { getGetProfileQueryKey } from "@/apis/profile/profile";
import { createQueryFactory } from "../../../../../libs/queryFactory";
import { showProfile, updateProfile } from "../actions/profile";
import { ProfileUpdateInput, ProfileUpdateResponse } from "@/apis/model";
import { useMutation } from "@tanstack/react-query";

export const fetchShowProfileQuery = createQueryFactory(
  () => [getGetProfileQueryKey()],
  async () => showProfile(),
);

export const useUpdateProfileMutation = (onMutate: () => void, onSuccess: (result: ProfileUpdateResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: ProfileUpdateInput) => updateProfile(input),
    onSuccess,
  });
