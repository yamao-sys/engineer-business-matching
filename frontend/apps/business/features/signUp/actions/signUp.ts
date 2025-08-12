"use server";

import { postCompanySignUp, postCompanyValidateSignUp } from "@/apis/companies/companies";
import { CompanySignUpInput, CompanySignUpValidationError } from "@/apis/model";

export const validateSignUp = async (data: CompanySignUpInput): Promise<CompanySignUpValidationError> => {
  try {
    const res = await postCompanyValidateSignUp(data);

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

export const signUp = async (data: CompanySignUpInput): Promise<CompanySignUpValidationError> => {
  try {
    const res = await postCompanySignUp(data);

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
