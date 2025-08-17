"use client";

import { FC, useCallback } from "react";
import { PhaseType } from "@/features/signUp/types";
import { useFormContext } from "react-hook-form";
import { EngineerSignUpInput, EngineerSignUpValidationError } from "@/apis/model";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseImage from "@repo/ui/BaseImage/index";
import { useSignUpMutation } from "../../queries/signUpMutation";
import BaseTitle from "@repo/ui/BaseTitle/index";
import { getDateString } from "../../../../../../libs/date";

type Props = {
  togglePhase: (newPhase: PhaseType) => void;
};

const SignUpConfirm: FC<Props> = ({ togglePhase }: Props) => {
  const { getValues } = useFormContext<EngineerSignUpInput>();
  const values = getValues();

  const handleBackToInput = () => togglePhase("input");

  const onMutateSuccess = useCallback(
    (result: EngineerSignUpValidationError) => {
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
      <BaseTitle title="エンジニア登録の入力内容" />

      <div className="flex w-full justify-around mt-16">
        <div className="w-1/2 align-middle">氏名: </div>
        <div className="w-1/2 align-middle">
          {values.lastName} {values.firstName}
        </div>
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
        <div className="w-1/2 align-middle">生年月日: </div>
        <div className="w-1/2 align-middle">{getDateString(new Date(String(values.birthday)))}</div>
      </div>
      <div className="flex w-full justify-around mt-8">
        <div className="w-1/2 align-middle">本人確認書類(表面): </div>
        <div className="w-1/2 align-middle">
          <BaseImage file={values.frontIdentification} />
        </div>
      </div>
      <div className="flex w-full justify-around mt-8">
        <div className="w-1/2 align-middle">本人確認書類(裏面): </div>
        <div className="w-1/2 align-middle">
          <BaseImage file={values.backIdentification} />
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
