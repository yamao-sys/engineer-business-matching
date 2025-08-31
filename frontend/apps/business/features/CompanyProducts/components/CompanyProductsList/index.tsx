"use client";

import { FC, useCallback, useState } from "react";
import BaseButton from "@repo/ui/BaseButton/index";
import { fetchCompanyProductsQuery, useDeleteCompanyProductMutation } from "../../queries/companyProductQueries";
import CompanyProductModal from "../CompanyProductModal";
import type { CompanyProduct } from "@/apis/model";
import CompanyProductRow from "../CompanyProductRow";

const CompanyProductsList: FC = () => {
  const { data: products, isLoading } = fetchCompanyProductsQuery().use();

  const deleteMutation = useDeleteCompanyProductMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAddProduct = useCallback(() => setIsCreateModalOpen(true), []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-6">
          <div className="text-right">
            <BaseButton borderColor="border-blue-500" bgColor="bg-blue-500" label="追加する" onClick={handleAddProduct} />
          </div>

          {isCreateModalOpen && (
            <CompanyProductModal onClose={() => setIsCreateModalOpen(false)} product={{} as CompanyProduct} isNewProduct={true} />
          )}

          {products && products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product: CompanyProduct) => (
                <CompanyProductRow key={product.id} product={product} deleteMutation={deleteMutation} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">プロダクトが登録されていません。</div>
          )}
        </div>
      )}
    </>
  );
};

export default CompanyProductsList;
