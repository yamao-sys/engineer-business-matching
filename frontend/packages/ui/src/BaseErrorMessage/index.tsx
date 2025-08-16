import { memo } from "react";

type Props = {
  message: string;
  additionalClassName?: string;
};

const BaseErrorMessage = memo(function BaseErrorMessage({ message, additionalClassName }: Props) {
  return (
    <>
      <p className={`text-red-400 ${additionalClassName}`}>{message}</p>
    </>
  );
});

export default BaseErrorMessage;
