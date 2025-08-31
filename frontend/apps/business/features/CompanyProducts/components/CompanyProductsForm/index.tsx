import { FC } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "../../../../../../libs/queryFactory";
import { fetchCompanyProductsQuery } from "../../queries/companyProductQueries";
import CompanyProductsList from "../CompanyProductsList";

const CompanyProductsForm: FC = async () => {
  const queryClient = createQueryClient();
  await fetchCompanyProductsQuery().prefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompanyProductsList />
    </HydrationBoundary>
  );
};

export default CompanyProductsForm;
