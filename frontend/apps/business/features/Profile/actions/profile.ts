"use server";

import { Profile, ProfileUpdateInput, ProfileUpdateResponse } from "@/apis/model";
import { getProfile, putProfile } from "@/apis/profile/profile";
import { cookies } from "next/headers";

export const showProfile = async (): Promise<Profile> => {
  try {
    const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
    const res = await getProfile({ headers: { "Business-Authorization": businessToken } });

    switch (res.status) {
      case 200:
        return res.data;
      case 500:
        throw new Error("Not Found", { cause: res.data });
      default:
        console.error("Failed to show profile", res.status);
        throw new Error("Failed to show profile");
    }
  } catch (error) {
    console.error("Failed to show profile:", error);
    throw error;
  }
};

export const updateProfile = async (data: ProfileUpdateInput): Promise<ProfileUpdateResponse> => {
  try {
    const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
    const res = await putProfile(data, { headers: { "Business-Authorization": businessToken } });

    switch (res.status) {
      case 200:
        return res.data;
      case 400:
        return res.data;
      default:
        throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};
