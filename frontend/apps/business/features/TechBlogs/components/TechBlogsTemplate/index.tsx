import { FC, Suspense } from "react";

import BaseContainer from "@repo/ui/BaseContainer/index";
import BaseTitle from "@repo/ui/BaseTitle/index";
import TechBlogsForm from "../TechBlogsForm";

const TechBlogsTemplate: FC = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BaseContainer>
        <BaseTitle title="技術ブログ管理" />

        <TechBlogsForm />
      </BaseContainer>
    </Suspense>
  );
};

export default TechBlogsTemplate;
