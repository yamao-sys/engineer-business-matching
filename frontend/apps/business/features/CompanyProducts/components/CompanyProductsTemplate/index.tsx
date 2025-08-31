import { FC, Suspense } from "react";

import BaseContainer from "@repo/ui/BaseContainer/index";
import BaseTitle from "@repo/ui/BaseTitle/index";
import CompanyProductsForm from "../CompanyProductsForm";

const CompanyProductsTemplate: FC = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaseContainer>
        <BaseTitle title="プロダクト管理" />

        <CompanyProductsForm />
      </BaseContainer>
    </Suspense>
  );
};

export default CompanyProductsTemplate;
