"use client";

import { FC } from "react";
import SignInInput from "../SignInInput";
import BaseTitle from "@repo/ui/BaseTitle/index";

const SignInForm: FC = () => {
  return (
    <>
      <BaseTitle title="ログインフォーム" />

      <SignInInput />
    </>
  );
};

export default SignInForm;
