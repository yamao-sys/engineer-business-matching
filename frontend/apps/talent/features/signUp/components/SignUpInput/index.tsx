"use client";

import { FC, useCallback, useState } from "react";
import { PhaseType } from "@/features/signUp/types";
import { EngineerSignUpInput, EngineerSignUpValidationError } from "@/apis/model";
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
  firstName: [],
  lastName: [],
  email: [],
  password: [],
  birthday: [],
  frontIdentification: [],
  backIdentification: [],
};

const SignUpInput: FC<Props> = ({ togglePhase }: Props) => {
  const [validationErrors, setValidationErrors] = useState<EngineerSignUpValidationError>(INITIAL_VALIDATION_ERRORS);

  const { control, handleSubmit, setValue, watch } = useFormContext<EngineerSignUpInput>();

  const onMutate = useCallback(() => setValidationErrors(INITIAL_VALIDATION_ERRORS), [setValidationErrors]);
  const onMutateSuccess = useCallback(
    (result: EngineerSignUpValidationError) => {
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
      <BaseTitle title="エンジニア登録フォーム" />

      <form onSubmit={onSubmit}>
        <BaseBox additionalClassName="flex justify-between">
          <div className="w-9/20">
            <BaseControlFormInput id="last-name" label="姓" control={control} name="lastName" validationErrors={validationErrors.lastName ?? []} />
          </div>
          <div className="w-9/20">
            <BaseControlFormInput id="first-name" label="名" control={control} name="firstName" validationErrors={validationErrors.firstName ?? []} />
          </div>
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
          <BaseControlFormInput
            id="birthday"
            label="生年月日"
            control={control}
            name="birthday"
            type="date"
            validationErrors={validationErrors.birthday ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormImage
            id="front-identification"
            label="本人確認書類(表面)"
            control={control}
            setValue={setValue}
            watch={watch}
            name="frontIdentification"
            validationErrors={validationErrors.frontIdentification ?? []}
          />
        </BaseBox>

        <BaseBox>
          <BaseControlFormImage
            id="back-identification"
            label="本人確認書類(裏面)"
            control={control}
            setValue={setValue}
            watch={watch}
            name="backIdentification"
            validationErrors={validationErrors.backIdentification ?? []}
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
