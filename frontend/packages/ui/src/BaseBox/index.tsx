import { memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  additionalClassName?: string;
};

const BaseBox = memo(function BaseBox({ children, additionalClassName }: Props) {
  return (
    <>
      <div className={`mt-8 ${additionalClassName}`}>{children}</div>
    </>
  );
});

export default BaseBox;
