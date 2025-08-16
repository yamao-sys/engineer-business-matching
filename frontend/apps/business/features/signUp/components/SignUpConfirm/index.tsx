"use client";

import { FC, useCallback } from "react";
import { PhaseType } from "@/features/signUp/types";
import { useFormContext } from "react-hook-form";
import { CompanySignUpInput, CompanySignUpValidationError } from "@/apis/model";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseImage from "@repo/ui/BaseImage/index";
import { useSignUpMutation } from "../../queries/signUpMutation";

type Props = {
  togglePhase: (newPhase: PhaseType) => void;
};

const SignUpConfirm: FC<Props> = ({ togglePhase }: Props) => {
  const { getValues } = useFormContext<CompanySignUpInput>();
  const values = getValues();

  const handleBackToInput = () => togglePhase("input");

  const onMutateSuccess = useCallback(
    (result: CompanySignUpValidationError) => {
      if (Object.keys(result).length === 0) {
        togglePhase("thanks");
        return;
      }
    },
    [togglePhase],
  );
  const mutation = useSignUpMutation(onMutateSuccess);

  const handleSignUp = useCallback(async () => mutation.mutate(values), [mutation, values]);

  return (
    <>
      <h3 className="w-full text-center text-2xl font-bold">企業登録の入力内容</h3>

      <div className="flex w-full justify-around mt-16">
        <div className="w-1/2 align-middle">企業名: </div>
        <div className="w-1/2 align-middle">{values.name}</div>
      </div>
      <div className="flex w-full justify-around mt-8">
        <div className="w-1/2 align-middle">メールアドレス: </div>
        <div className="w-1/2 align-middle">{values.email}</div>
      </div>
      <div className="flex w-full justify-around mt-8">
        <div className="w-1/2 align-middle">パスワード: </div>
        <div className="w-1/2 align-middle">{"*".repeat(values.password.length)}</div>
      </div>
      <div className="flex w-full justify-around mt-8">
        <div className="w-1/2 align-middle">確定申告書(コピー): </div>
        <div className="w-1/2 align-middle">
          <BaseImage file={values.finalTaxReturn} />
        </div>
      </div>

      <div className="flex w-full justify-around mt-16">
        <BaseButton
          disabled={mutation.isPending}
          borderColor="border-gray-500"
          bgColor="bg-gray-500"
          label={mutation.isPending ? "送信中..." : "入力へ戻る"}
          onClick={handleBackToInput}
        />
        <BaseButton
          disabled={mutation.isPending}
          borderColor="border-green-500"
          bgColor="bg-green-500"
          label={mutation.isPending ? "送信中..." : "登録する"}
          onClick={handleSignUp}
        />
      </div>
    </>
  );
};

export default SignUpConfirm;
