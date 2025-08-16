"use server";

import { postCompanySignIn } from "@/apis/companies/companies";
import { CompanySignInInput, CompanySignInResponse } from "@/apis/model";
import { cookies } from "next/headers";

export const signIn = async (data: CompanySignInInput): Promise<CompanySignInResponse> => {
  try {
    const res = await postCompanySignIn(data);

    switch (res.status) {
      case 200:
        (await cookies()).set("businessToken", res.data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24,
          path: "/",
        });
        return res.data;
      case 400:
        return res.data;
      default:
        throw new Error("Failed to sign in");
    }
  } catch (error) {
    console.error("Failed to sign in:", error);
    throw error;
  }
};
