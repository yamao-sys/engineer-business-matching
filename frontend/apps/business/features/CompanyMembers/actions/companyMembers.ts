"use server";

import { cookies } from "next/headers";
import { deleteCompanyMember, getCompanyMember, getCompanyMembers, postCompanyMember, putCompanyMember } from "@/apis/company-member/company-member";
import type { CompanyMember, CompanyMemberUpdateInput, CompanyMemberUpdateResponse } from "@/apis/model";

export const fetchCompanyMembers = async (): Promise<CompanyMember[]> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await getCompanyMembers({
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    default:
      console.error("Failed to show company members", res.data);
      throw new Error("Failed to show company members", { cause: res.data });
  }
};

export const showCompanyMember = async (id: string): Promise<CompanyMember> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await getCompanyMember(id, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    default:
      console.error("Failed to show company member", res.data);
      throw new Error("Failed to show company member", { cause: res.data });
  }
};

export const createCompanyMember = async (input: CompanyMemberUpdateInput): Promise<CompanyMemberUpdateResponse> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await postCompanyMember(input, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    case 400:
      return res.data;
    default:
      console.error("Failed to create company member", res.data);
      throw new Error("Failed to create company member", { cause: res.data });
  }
};

export const updateCompanyMember = async (id: string, input: CompanyMemberUpdateInput): Promise<CompanyMemberUpdateResponse> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await putCompanyMember(id, input, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    case 400:
      return res.data;
    case 404:
      console.error("Company member not found", res.data);
      throw new Error("Company member not found", { cause: res.data });
    default:
      console.error("Failed to update company member", res.data);
      throw new Error("Failed to update company member", { cause: res.data });
  }
};

export const removeCompanyMember = async (id: string): Promise<void> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await deleteCompanyMember(id, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return;
    case 404:
      console.error("Company member not found", res.data);
      throw new Error("Company member not found", { cause: res.data });
    default:
      console.error("Failed to delete company member", res.data);
      throw new Error("Failed to delete company member", { cause: res.data });
  }
};
