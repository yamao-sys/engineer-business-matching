"use client";

import { FC, useState } from "react";
import SignUpLayout from "../SignUpLayout";
import SignUpInput from "../SignUpInput";
import SignUpConfirm from "../SignUpConfirm";
import SignUpThanks from "../SignUpThanks";
import { PhaseType } from "@/features/signUp/types";
import { FormProvider, useForm } from "react-hook-form";
import { CompanySignUpInput } from "@/apis/model";

const SignUpForm: FC = () => {
  const [phase, setPhase] = useState<PhaseType>("input");

  const togglePhase = (newPhase: PhaseType) => setPhase(newPhase);

  const formMethods = useForm<CompanySignUpInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      finalTaxReturn: undefined,
    },
  });

  const phaseComponent = () => {
    switch (phase) {
      case "input":
        return <SignUpInput togglePhase={togglePhase} />;
      case "confirm":
        return <SignUpConfirm togglePhase={togglePhase} />;
      case "thanks":
        return <SignUpThanks />;
    }
  };

  return (
    <SignUpLayout phase={phase}>
      <FormProvider {...formMethods}>{phaseComponent()}</FormProvider>
    </SignUpLayout>
  );
};

export default SignUpForm;
