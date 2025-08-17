"use server";

import { postEngineerSignUp, postEngineerValidateSignUp } from "@/apis/engineers/engineers";
import { EngineerSignUpInput, EngineerSignUpValidationError } from "@/apis/model";

export const validateSignUp = async (data: EngineerSignUpInput): Promise<EngineerSignUpValidationError> => {
  try {
    const res = await postEngineerValidateSignUp(data);

    switch (res.status) {
      case 200:
        return res.data.errors;
      case 400:
        return res.data.errors;
      default:
        throw new Error("Failed to validate sign up");
    }
  } catch (error) {
    console.error("Failed to validate sign up:", error);
    throw error;
  }
};

export const signUp = async (data: EngineerSignUpInput): Promise<EngineerSignUpValidationError> => {
  try {
    const res = await postEngineerSignUp(data);

    switch (res.status) {
      case 200:
        return res.data.errors;
      case 400:
        return res.data.errors;
      default:
        throw new Error("Failed to validate sign up");
    }
  } catch (error) {
    console.error("Failed to validate sign up:", error);
    throw error;
  }
};
