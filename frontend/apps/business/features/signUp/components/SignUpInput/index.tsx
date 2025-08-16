"use client";

import { FC, useCallback, useState } from "react";
import { PhaseType } from "@/features/signUp/types";
import { CompanySignUpInput, CompanySignUpValidationError } from "@/apis/model";
import { useFormContext } from "react-hook-form";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseControlFormImage from "@repo/ui/BaseControlFormImage/index";
import { useValidateSignUpMutation } from "../../queries/signUpMutation";
import BaseTitle from "@repo/ui/BaseTitle/index";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import BaseBox from "@repo/ui/BaseBox/index";

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
      <BaseTitle title="企業登録フォーム" />

      <form onSubmit={onSubmit}>
        <BaseBox>
          <BaseControlFormInput id="name" label="企業名" control={control} name="name" validationErrors={validationErrors.name ?? []} />
        </BaseBox>

        <BaseBox>
          <BaseControlFormInput
            id="email"
            label="メールアドレス"
            control={control}
            name="email"
            type="email"
            validationErrors={validationErrors.email ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormInput
            id="password"
            label="パスワード"
            control={control}
            name="password"
            type="password"
            validationErrors={validationErrors.password ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormImage
            id="finalTaxReturn"
            label="確定申告書(コピー)"
            control={control}
            setValue={setValue}
            watch={watch}
            name="finalTaxReturn"
            validationErrors={validationErrors.finalTaxReturn ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseFlexCentralBox>
            <BaseButton
              disabled={mutation.isPending}
              borderColor="border-green-500"
              bgColor="bg-green-500"
              label={mutation.isPending ? "送信中..." : "確認画面へ"}
              type="submit"
            />
          </BaseFlexCentralBox>
        </BaseBox>
      </form>
    </>
  );
};

export default SignUpInput;
