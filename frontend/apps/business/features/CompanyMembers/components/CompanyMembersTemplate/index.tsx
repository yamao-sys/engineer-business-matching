import { FC, Suspense } from "react";

import BaseContainer from "@repo/ui/BaseContainer/index";
import BaseTitle from "@repo/ui/BaseTitle/index";
import CompanyMembersList from "../CompanyMembersList";

const CompanyMembersTemplate: FC = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaseContainer>
        <BaseTitle title="メンバー管理" />

        <CompanyMembersList />
      </BaseContainer>
    </Suspense>
  );
};

export default CompanyMembersTemplate;
