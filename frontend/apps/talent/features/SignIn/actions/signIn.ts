"use server";

import { postEngineerSignIn } from "@/apis/engineers/engineers";
import { EngineerSignInInput, EngineerSignInResponse } from "@/apis/model";
import { cookies } from "next/headers";

export const signIn = async (data: EngineerSignInInput): Promise<EngineerSignInResponse> => {
  try {
    const res = await postEngineerSignIn(data);

    switch (res.status) {
      case 200:
        (await cookies()).set("talentToken", res.data.token, {
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
