"use client";

import { FC, useCallback, useState } from "react";
import { PhaseType } from "@/features/signUp/types";
import { CompanySignUpInput, CompanySignUpValidationError } from "@/apis/model";
import { useFormContext } from "react-hook-form";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseControlFormImage from "@repo/ui/BaseControlFormImage/index";
import { useValidateSignUpMutation } from "../../queries/signUpMutation";

type Props = {
  togglePhase: (newPhase: PhaseType) => void;
};

const INITIAL_VALIDATION_ERRORS = {
  name: [],
  email: [],
  password: [],
  finalTaxReturn: [],
};

const SignUpInput: FC<Props> = ({ togglePhase }: Props) => {
  const [validationErrors, setValidationErrors] = useState<CompanySignUpValidationError>(INITIAL_VALIDATION_ERRORS);

  const { control, handleSubmit, setValue, watch } = useFormContext<CompanySignUpInput>();

  const onMutate = useCallback(() => setValidationErrors(INITIAL_VALIDATION_ERRORS), [setValidationErrors]);
  const onMutateSuccess = useCallback(
    (result: CompanySignUpValidationError) => {
      if (Object.keys(result).length > 0) {
        setValidationErrors(result);
        return;
      }

      // NOTE: 確認画面に遷移
      togglePhase("confirm");
    },
    [setValidationErrors, togglePhase],
  );
  const mutation = useValidateSignUpMutation(onMutate, onMutateSuccess);

  const onSubmit = handleSubmit(async (data) => mutation.mutate(data));

  return (
    <>
      <h3 className="mt-16 w-full text-center text-2xl font-bold">企業登録フォーム</h3>

      <form onSubmit={onSubmit}>
        <div className="mt-8">
          <BaseControlFormInput id="name" label="企業名" control={control} name="name" validationErrors={validationErrors.name ?? []} />
        </div>

        <div className="mt-8">
          <BaseControlFormInput
            id="email"
            label="メールアドレス"
            control={control}
            name="email"
            type="email"
            validationErrors={validationErrors.email ?? []}
          />
        </div>

        <div className="mt-8">
          <BaseControlFormInput
            id="password"
            label="パスワード"
            control={control}
            name="password"
            type="password"
            validationErrors={validationErrors.password ?? []}
          />
        </div>

        <div className="mt-8">
          <BaseControlFormImage
            id="finalTaxReturn"
            label="確定申告書(コピー)"
            control={control}
            setValue={setValue}
            watch={watch}
            name="finalTaxReturn"
            validationErrors={validationErrors.finalTaxReturn ?? []}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <BaseButton
            disabled={mutation.isPending}
            borderColor="border-green-500"
            bgColor="bg-green-500"
            label={mutation.isPending ? "送信中..." : "確認画面へ"}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default SignUpInput;
