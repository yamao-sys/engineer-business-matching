import { EngineerSignInInput, EngineerSignInResponse } from "@/apis/model";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../actions/signIn";

export const useSignInMutation = (onMutate: () => void, onSuccess: (result: EngineerSignInResponse) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: EngineerSignInInput) => signIn(input),
    onSuccess,
  });
