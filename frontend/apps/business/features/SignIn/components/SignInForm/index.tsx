"use client";

import { FC } from "react";
import SignInInput from "../SignInInput";
import BaseTitle from "@repo/ui/BaseTitle/index";
import { createQueryClient } from "../../../../../../libs/queryFactory";
import { QueryClientProvider } from "@tanstack/react-query";

const SignInForm: FC = () => {
  const queryClient = createQueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BaseTitle title="ログインフォーム" />

        <SignInInput />
      </QueryClientProvider>
    </>
  );
};

export default SignInForm;
