import { CompanySignUpInput, CompanySignUpValidationError } from "@/apis/model";
import { useMutation } from "@tanstack/react-query";
import { signUp, validateSignUp } from "../actions/signUp";

export const useValidateSignUpMutation = (onMutate: () => void, onSuccess: (result: CompanySignUpValidationError) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: CompanySignUpInput) => validateSignUp(input),
    onSuccess,
  });

export const useSignUpMutation = (onSuccess: (result: CompanySignUpValidationError) => void) =>
  useMutation({
    mutationFn: async (input: CompanySignUpInput) => signUp(input),
    onSuccess,
  });
