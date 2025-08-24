import BaseTitle from "@repo/ui/BaseTitle/index";
import { FC } from "react";
import ProfileInput from "../ProfileInput";
import { createQueryClient } from "../../../../../../libs/queryFactory";
import { fetchShowProfileQuery } from "../../queries/profileQueries";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const ProfileForm: FC = async () => {
  const queryClient = createQueryClient();
  await fetchShowProfileQuery().prefetch(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BaseTitle title="プロフィール編集" />

        <ProfileInput />
      </HydrationBoundary>
    </>
  );
};

export default ProfileForm;
