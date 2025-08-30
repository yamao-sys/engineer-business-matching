"use server";

import { CompanyStory, CompanyStoryUpdateInput, CompanyStoryUpdateResponse } from "@/apis/model";
import { getCompanyStory, putCompanyStory } from "@/apis/company-story/company-story";
import { cookies } from "next/headers";

export const showCompanyStory = async (): Promise<CompanyStory> => {
  try {
    const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
    const res = await getCompanyStory({ headers: { "Business-Authorization": businessToken } });

    switch (res.status) {
      case 200:
        return res.data;
      default:
        throw new Error("Failed to show company story", { cause: res.data });
    }
  } catch (error) {
    console.error("Failed to show company story:", error);
    throw error;
  }
};

export const updateCompanyStory = async (data: CompanyStoryUpdateInput): Promise<CompanyStoryUpdateResponse> => {
  try {
    const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
    const res = await putCompanyStory(data, { headers: { "Business-Authorization": businessToken } });

    switch (res.status) {
      case 200:
        return res.data;
      case 400:
        return res.data;
      default:
        throw new Error("Failed to update company story");
    }
  } catch (error) {
    console.error("Failed to update company story:", error);
    throw error;
  }
};
