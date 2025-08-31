"use server";

import { cookies } from "next/headers";
import {
  deleteCompanyProduct,
  getCompanyProduct,
  getCompanyProducts,
  postCompanyProduct,
  putCompanyProduct,
} from "@/apis/company-product/company-product";
import type { CompanyProduct, CompanyProductUpdateInput, CompanyProductUpdateResponse } from "@/apis/model";

export const fetchCompanyProducts = async (): Promise<CompanyProduct[]> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await getCompanyProducts({
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    default:
      console.error("Failed to show company products", res.data);
      throw new Error("Failed to show company products", { cause: res.data });
  }
};

export const showCompanyProduct = async (id: string): Promise<CompanyProduct> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await getCompanyProduct(id, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    default:
      console.error("Failed to show company product", res.data);
      throw new Error("Failed to show company product", { cause: res.data });
  }
};

export const createCompanyProduct = async (input: CompanyProductUpdateInput): Promise<CompanyProductUpdateResponse> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await postCompanyProduct(input, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    case 400:
      return res.data;
    default:
      console.error("Failed to create company product", res.data);
      throw new Error("Failed to create company product", { cause: res.data });
  }
};

export const updateCompanyProduct = async (id: string, input: CompanyProductUpdateInput): Promise<CompanyProductUpdateResponse> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await putCompanyProduct(id, input, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return res.data;
    case 400:
      return res.data;
    case 404:
      console.error("Company product not found", res.data);
      throw new Error("Company product not found", { cause: res.data });
    default:
      console.error("Failed to update company product", res.data);
      throw new Error("Failed to update company product", { cause: res.data });
  }
};

export const removeCompanyProduct = async (id: string): Promise<void> => {
  const businessToken = `Bearer ${(await cookies()).get("businessToken")?.value}`;
  const res = await deleteCompanyProduct(id, {
    headers: { "Business-Authorization": businessToken },
  });

  switch (res.status) {
    case 200:
      return;
    case 404:
      console.error("Company product not found", res.data);
      throw new Error("Company product not found", { cause: res.data });
    default:
      console.error("Failed to delete company product", res.data);
      throw new Error("Failed to delete company product", { cause: res.data });
  }
};
