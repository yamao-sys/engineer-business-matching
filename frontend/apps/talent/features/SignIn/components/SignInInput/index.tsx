"use client";

import { EngineerSignInInput, EngineerSignInResponse } from "@/apis/model";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../../queries/signInMutation";
import BaseControlFormInput from "@repo/ui/BaseControlFormInput/index";
import BaseButton from "@repo/ui/BaseButton/index";
import BaseErrorMessage from "@repo/ui/BaseErrorMessage/index";
import { useRouter } from "next/navigation";
import BaseFlexCentralBox from "@repo/ui/BaseFlexCentralBox/index";
import BaseBox from "@repo/ui/BaseBox/index";

const SignInInput: FC = () => {
  const [validationError, setValidationError] = useState<EngineerSignInResponse["error"]>("");

  const { control, handleSubmit } = useForm<EngineerSignInInput>();
  const router = useRouter();

  const onMutate = useCallback(() => setValidationError(""), [setValidationError]);
  const onMutateSuccess = useCallback(
    (result: EngineerSignInResponse) => {
      if (result.error) {
        setValidationError(result.error);
        return;
      }

      window.alert("ログインしました。");
      router.push("/");
    },
    [setValidationError, router],
  );
  const mutation = useSignInMutation(onMutate, onMutateSuccess);

  const onSubmit = handleSubmit(async (data) => mutation.mutate(data));

  return (
    <>
      <BaseErrorMessage message={validationError} additionalClassName="text-center" />

      <form onSubmit={onSubmit}>
        <BaseBox>
          <BaseControlFormInput id="email" label="メールアドレス" control={control} name="email" type="email" validationErrors={[]} />
        </BaseBox>

        <BaseBox>
          <BaseControlFormInput id="password" label="パスワード" control={control} name="password" type="password" validationErrors={[]} />
        </BaseBox>

        <BaseBox>
          <BaseFlexCentralBox>
            <BaseButton
              disabled={mutation.isPending}
              borderColor="border-green-500"
              bgColor="bg-green-500"
              label={mutation.isPending ? "送信中..." : "ログインする"}
              type="submit"
            />
          </BaseFlexCentralBox>
        </BaseBox>
      </form>
    </>
  );
};

export default SignInInput;
