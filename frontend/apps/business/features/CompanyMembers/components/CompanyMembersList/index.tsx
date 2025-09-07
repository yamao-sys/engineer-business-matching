"use client";

import { FC, useCallback, useState } from "react";
import BaseButton from "@repo/ui/BaseButton/index";
import { fetchCompanyMembersQuery, useDeleteCompanyMemberMutation } from "../../queries/companyMemberQueries";
import CompanyMemberModal from "../CompanyMemberModal";
import type { CompanyMember } from "@/apis/model";
import CompanyMemberRow from "../CompanyMemberRow";

const CompanyMembersList: FC = () => {
  const { data: members, isLoading } = fetchCompanyMembersQuery().use();

  const deleteMutation = useDeleteCompanyMemberMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleAddMember = useCallback(() => setIsCreateModalOpen(true), []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-6">
          <div className="text-right">
            <BaseButton borderColor="border-blue-500" bgColor="bg-blue-500" label="追加する" onClick={handleAddMember} />
          </div>

          {isCreateModalOpen && <CompanyMemberModal onClose={() => setIsCreateModalOpen(false)} member={{} as CompanyMember} isNewMember={true} />}

          {members && members.length > 0 ? (
            <div className="space-y-4">
              {members.map((member: CompanyMember) => (
                <CompanyMemberRow key={member.id} member={member} deleteMutation={deleteMutation} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">メンバーが登録されていません。</div>
          )}
        </div>
      )}
    </>
  );
};

export default CompanyMembersList;
