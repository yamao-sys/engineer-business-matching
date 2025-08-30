import BaseTitle from "@repo/ui/BaseTitle/index";
import { FC } from "react";
import CompanyStoryInput from "../CompanyStoryInput";
import { createQueryClient } from "../../../../../../libs/queryFactory";
import { fetchShowCompanyStoryQuery } from "../../queries/companyStoryQueries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const CompanyStoryForm: FC = async () => {
  const queryClient = createQueryClient();
  await fetchShowCompanyStoryQuery().prefetch(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BaseTitle title="企業ストーリー編集" />

        <CompanyStoryInput />
      </HydrationBoundary>
    </>
  );
};

export default CompanyStoryForm;
