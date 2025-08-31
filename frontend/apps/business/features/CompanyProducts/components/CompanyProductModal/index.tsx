"use client";

import { FC } from "react";
import CompanyProductForm from "../CompanyProductForm";
import { CompanyProduct } from "@/apis/model";

type Props = {
  onClose: () => void;
  product: CompanyProduct;
  isNewProduct: boolean;
};

const CompanyProductModal: FC<Props> = ({ onClose, product, isNewProduct }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{isNewProduct ? "プロダクト追加" : "プロダクト編集"}</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <CompanyProductForm product={product} isNewProduct={isNewProduct} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default CompanyProductModal;
