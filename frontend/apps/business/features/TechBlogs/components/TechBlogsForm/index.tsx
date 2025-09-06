import { FC } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { createQueryClient } from "../../../../../../libs/queryFactory";
import { fetchTechBlogsQuery } from "../../queries/techBlogQueries";
import TechBlogsList from "../TechBlogsList";

const TechBlogsForm: FC = async () => {
  const queryClient = createQueryClient();
  await fetchTechBlogsQuery().prefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TechBlogsList />
    </HydrationBoundary>
  );
};

export default TechBlogsForm;
