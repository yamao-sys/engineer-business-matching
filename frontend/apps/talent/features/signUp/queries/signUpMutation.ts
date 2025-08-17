import { EngineerSignUpInput, EngineerSignUpValidationError } from "@/apis/model";
import { useMutation } from "@tanstack/react-query";
import { signUp, validateSignUp } from "../actions/signUp";

export const useValidateSignUpMutation = (onMutate: () => void, onSuccess: (result: EngineerSignUpValidationError) => void) =>
  useMutation({
    onMutate,
    mutationFn: async (input: EngineerSignUpInput) => validateSignUp(input),
    onSuccess,
  });

export const useSignUpMutation = (onSuccess: (result: EngineerSignUpValidationError) => void) =>
  useMutation({
    mutationFn: async (input: EngineerSignUpInput) => signUp(input),
    onSuccess,
  });
