"use client";

import { CompanyProduct } from "@/apis/model";
import { FC, useCallback, useState } from "react";
import BaseBox from "@repo/ui/BaseBox/index";
import Image from "next/image";
import BaseButton from "@repo/ui/BaseButton/index";
import CompanyProductModal from "../CompanyProductModal";
import { UseMutationResult } from "@tanstack/react-query";

type Props = {
  product: CompanyProduct;
  deleteMutation: UseMutationResult<void, Error, string, void>;
};

const CompanyProductRow: FC<Props> = ({ product, deleteMutation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProduct = useCallback(() => setIsModalOpen(true), []);

  const handleDeleteProduct = useCallback(
    (product: CompanyProduct) => {
      if (!confirm(`「${product.name}」を削除しますか？`)) {
        return;
      }
      deleteMutation.mutate(product.id);
      window.alert("プロダクトを削除しました。");
    },
    [deleteMutation],
  );
  return (
    <BaseBox>
      <div className="flex items-start justify-between rounded-lg border border-gray-200 p-4">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            {product.logoUrl && (
              <Image src={product.logoUrl} alt={`${product.name}のロゴ`} className="w-16 h-16 object-cover rounded-lg" width={64} height={64} />
            )}
            <div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              {product.url && (
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
                  {product.url}
                </a>
              )}
            </div>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">{product.description}</p>
        </div>

        <div className="space-x-2 ml-6">
          <BaseButton borderColor="border-green-500" bgColor="bg-green-500" label="編集する" onClick={handleEditProduct} />
          <BaseButton
            borderColor="border-red-500"
            bgColor="bg-red-500"
            label={deleteMutation.isPending ? "削除中..." : "削除する"}
            onClick={() => handleDeleteProduct(product)}
            disabled={deleteMutation.isPending}
          />
        </div>
      </div>

      <CompanyProductModal onClose={() => setIsModalOpen(false)} product={product} isNewProduct={false} isModalOpen={isModalOpen} />
    </BaseBox>
  );
};

export default CompanyProductRow;
