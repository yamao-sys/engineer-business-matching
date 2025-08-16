import { CompanySignInInput, CompanySignInResponse } from "@/apis/model";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../actions/signIn";

export const useSignInMutation = (onMutate: () => void, onSuccess: (result: CompanySignInResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: CompanySignInInput) => signIn(input),
    onSuccess,
  });
