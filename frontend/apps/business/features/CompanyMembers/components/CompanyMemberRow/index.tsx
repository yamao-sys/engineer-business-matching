"use client";

import { CompanyMember } from "@/apis/model";
import { FC, useCallback, useState } from "react";
import BaseBox from "@repo/ui/BaseBox/index";
import Image from "next/image";
import BaseButton from "@repo/ui/BaseButton/index";
import CompanyMemberModal from "../CompanyMemberModal";
import { UseMutationResult } from "@tanstack/react-query";

type Props = {
  member: CompanyMember;
  deleteMutation: UseMutationResult<void, Error, string, void>;
};

const CompanyMemberRow: FC<Props> = ({ member, deleteMutation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditMember = useCallback(() => setIsModalOpen(true), []);

  const handleDeleteMember = useCallback(
    (member: CompanyMember) => {
      if (!confirm(`「${member.name}」を削除しますか？`)) {
        return;
      }
      deleteMutation.mutate(member.id);
    },
    [deleteMutation],
  );
  return (
    <BaseBox>
      <div className="flex items-start justify-between rounded-lg border border-gray-200 p-4">
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-4">
            {member.iconUrl && (
              <Image src={member.iconUrl} alt={`${member.name}のアイコン`} className="w-16 h-16 object-cover rounded-full" width={64} height={64} />
            )}
            <div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              {member.position && <p className="text-gray-600 text-sm">{member.position}</p>}
            </div>
          </div>
          <p className="text-gray-600 whitespace-pre-wrap">{member.description}</p>
        </div>

        <div className="space-x-2 ml-6">
          <BaseButton borderColor="border-green-500" bgColor="bg-green-500" label="編集する" onClick={handleEditMember} />
          <BaseButton
            borderColor="border-red-500"
            bgColor="bg-red-500"
            label={deleteMutation.isPending ? "削除中..." : "削除する"}
            onClick={() => handleDeleteMember(member)}
            disabled={deleteMutation.isPending}
          />
        </div>
      </div>

      {isModalOpen && <CompanyMemberModal onClose={() => setIsModalOpen(false)} member={member} isNewMember={false} />}
    </BaseBox>
  );
};

export default CompanyMemberRow;
