"use client";

import { FC } from "react";
import CompanyMemberForm from "../CompanyMemberForm";
import { CompanyMember } from "@/apis/model";

type Props = {
  onClose: () => void;
  member: CompanyMember;
  isNewMember: boolean;
};

const CompanyMemberModal: FC<Props> = ({ onClose, member, isNewMember }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{isNewMember ? "メンバー追加" : "メンバー編集"}</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <CompanyMemberForm member={member} isNewMember={isNewMember} onSuccess={onClose} />
      </div>
    </div>
  );
};

export default CompanyMemberModal;
